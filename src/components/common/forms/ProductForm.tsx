// src/components/forms/ProductForm.tsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Switch,
  FormControlLabel,
  InputAdornment,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import dayjs, { Dayjs } from 'dayjs';
import { Save, Cancel } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Tipos locales (reemplaza las importaciones con @)
interface ProductoFormType {
  nombre: string;
  descripcion?: string;
  categoria_id: number;
  precio_compra: number;
  precio_venta: number;
  stock_minimo: number;
  stock_maximo: number;
  codigo_barras?: string;
}

interface Categoria {
  id: number;
  nombre: string;
}

// Mock del servicio (reemplaza la importación con @)
const productosService = {
  getCategorias: async () => ({
    data: [
      { id: 1, nombre: 'Medicamentos' },
      { id: 2, nombre: 'Material Médico' },
      { id: 3, nombre: 'Equipos' },
    ] as Categoria[]
  }),
  create: async (data: any) => {
    console.log('Creating product:', data);
    return { data: { id: 1, ...data } };
  },
  update: async (id: number, data: any) => {
    console.log('Updating product:', id, data);
    return { data: { id, ...data } };
  },
  getById: async (id: number) => {
    console.log('Getting product:', id);
    return {
      data: {
        id,
        nombre: 'Producto de prueba',
        descripcion: 'Descripción de prueba',
        categoria_id: 1,
        precio_compra: 100,
        precio_venta: 130,
        stock_minimo: 10,
        stock_maximo: 100,
        codigo_barras: '123456789',
        fecha_vencimiento: '2025-12-31'
      }
    };
  }
};

const schema = yup.object({
  nombre: yup.string().required('El nombre es requerido'),
  descripcion: yup.string().optional(),
  categoria_id: yup.number().required('La categoría es requerida'),
  precio_compra: yup.number().positive('Debe ser mayor a 0').required('El precio de compra es requerido'),
  precio_venta: yup.number().positive('Debe ser mayor a 0').required('El precio de venta es requerido'),
  stock_minimo: yup.number().min(0, 'Debe ser mayor o igual a 0').required('El stock mínimo es requerido'),
  stock_maximo: yup.number().min(0, 'Debe ser mayor o igual a 0').required('El stock máximo es requerido'),
  codigo_barras: yup.string().optional(),
});

interface ProductFormProps {
  productId?: number;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ 
  productId, 
  onSuccess, 
  onCancel 
}) => {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(false);
  const [fechaVencimiento, setFechaVencimiento] = useState<Dayjs | null>(null);
  const [tieneFechaVencimiento, setTieneFechaVencimiento] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProductoFormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      nombre: '',
      descripcion: '',
      categoria_id: 0,
      precio_compra: 0,
      precio_venta: 0,
      stock_minimo: 0,
      stock_maximo: 0,
      codigo_barras: '',
    },
  });

  const precioCompra = watch('precio_compra');
  const stockMinimo = watch('stock_minimo');
  const stockMaximo = watch('stock_maximo');

  useEffect(() => {
    loadCategorias();
    if (productId) {
      loadProducto();
    }
  }, [productId]);

  useEffect(() => {
    // Auto-calcular precio de venta con margen del 30%
    if (precioCompra > 0) {
      const precioSugerido = precioCompra * 1.3;
      setValue('precio_venta', Number(precioSugerido.toFixed(2)));
    }
  }, [precioCompra, setValue]);

  useEffect(() => {
    // Validar que stock máximo sea mayor que mínimo
    if (stockMinimo > 0 && stockMaximo > 0 && stockMinimo >= stockMaximo) {
      setValue('stock_maximo', stockMinimo + 10);
    }
  }, [stockMinimo, stockMaximo, setValue]);

  const loadCategorias = async () => {
    try {
      const response = await productosService.getCategorias();
      setCategorias(response.data);
    } catch (error) {
      console.error('Error loading categorias:', error);
    }
  };

  const loadProducto = async () => {
    if (!productId) return;
    
    try {
      setLoading(true);
      const response = await productosService.getById(productId);
      const producto = response.data;
      
      // Resetear el formulario con los datos del producto
      reset({
        nombre: producto.nombre,
        descripcion: producto.descripcion || '',
        categoria_id: producto.categoria_id,
        precio_compra: producto.precio_compra,
        precio_venta: producto.precio_venta,
        stock_minimo: producto.stock_minimo,
        stock_maximo: producto.stock_maximo,
        codigo_barras: producto.codigo_barras || '',
      });

      // Manejar fecha de vencimiento si existe
      if (producto.fecha_vencimiento) {
        setTieneFechaVencimiento(true);
        setFechaVencimiento(dayjs(producto.fecha_vencimiento));
      }
    } catch (error) {
      console.error('Error loading producto:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ProductoFormType) => {
    try {
      setLoading(true);
      
      const formData = {
        ...data,
        fecha_vencimiento: tieneFechaVencimiento && fechaVencimiento 
          ? fechaVencimiento.format('YYYY-MM-DD') 
          : undefined,
      };

      if (productId) {
        await productosService.update(productId, formData);
      } else {
        await productosService.create(formData);
      }

      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/productos');
      }
    } catch (error: any) {
      console.error('Error saving producto:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate('/productos');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Typography variant="h5" gutterBottom>
          {productId ? 'Editar Producto' : 'Nuevo Producto'}
        </Typography>

        <Card>
          <CardContent>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                {/* Información básica */}
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Información Básica
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name="nombre"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Nombre del Producto"
                        error={!!errors.nombre}
                        helperText={errors.nombre?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name="categoria_id"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.categoria_id}>
                        <InputLabel>Categoría</InputLabel>
                        <Select {...field} label="Categoría">
                          {categorias.map((categoria) => (
                            <MenuItem key={categoria.id} value={categoria.id}>
                              {categoria.nombre}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>{errors.categoria_id?.message}</FormHelperText>
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="descripcion"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Descripción"
                        multiline
                        rows={3}
                        error={!!errors.descripcion}
                        helperText={errors.descripcion?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name="codigo_barras"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Código de Barras"
                        error={!!errors.codigo_barras}
                        helperText={errors.codigo_barras?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Precios */}
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    Precios
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name="precio_compra"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Precio de Compra"
                        type="number"
                        InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        error={!!errors.precio_compra}
                        helperText={errors.precio_compra?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name="precio_venta"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Precio de Venta"
                        type="number"
                        InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        error={!!errors.precio_venta}
                        helperText={errors.precio_venta?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Stock */}
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    Control de Stock
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name="stock_minimo"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Stock Mínimo"
                        type="number"
                        error={!!errors.stock_minimo}
                        helperText={errors.stock_minimo?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name="stock_maximo"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Stock Máximo"
                        type="number"
                        error={!!errors.stock_maximo}
                        helperText={errors.stock_maximo?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Fecha de vencimiento */}
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    Vencimiento
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={tieneFechaVencimiento}
                        onChange={(e) => setTieneFechaVencimiento(e.target.checked)}
                      />
                    }
                    label="Producto con fecha de vencimiento"
                  />
                </Grid>

                {tieneFechaVencimiento && (
                  <Grid item xs={12} md={6}>
                    <DatePicker
                      label="Fecha de Vencimiento"
                      value={fechaVencimiento}
                      onChange={(newValue) => setFechaVencimiento(newValue)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: false,
                        },
                      }}
                    />
                  </Grid>
                )}

                {/* Botones */}
                <Grid item xs={12}>
                  <Box display="flex" gap={2} justifyContent="flex-end" sx={{ mt: 3 }}>
                    <Button
                      variant="outlined"
                      onClick={handleCancel}
                      startIcon={<Cancel />}
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={loading}
                      startIcon={<Save />}
                    >
                      {loading ? 'Guardando...' : 'Guardar'}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </LocalizationProvider>
  );
};

export default ProductForm;