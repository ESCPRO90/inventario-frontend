// src/pages/inventario/InventarioList.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
  TextField,
  InputAdornment,
  Button,
  Chip,
  Alert,
} from '@mui/material';
import {
  Search,
  Warning,
  CheckCircle,
  Error,
  GetApp,
} from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { InventarioItem, ResumenInventario } from '@/types/inventario.types';
import { useDebounce } from '@/hooks/useDebounce';
import { formatCurrency, formatDate } from '@/utils/formatters';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const InventarioList: React.FC = () => {
  const [inventario, setInventario] = useState<InventarioItem[]>([]);
  const [resumen, setResumen] = useState<ResumenInventario | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtro, setFiltro] = useState<'todos' | 'bajo_stock' | 'vencidos'>('todos');

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    loadInventario();
    loadResumen();
  }, [debouncedSearchTerm, filtro]);

  const loadInventario = async () => {
    try {
      setLoading(true);
      // Simular llamada a API
      const mockData: InventarioItem[] = [
        {
          producto_id: 1,
          producto: {
            id: 1,
            nombre: 'Paracetamol 500mg',
            codigo_barras: '123456789',
            categoria_id: 1,
            precio_compra: 0.50,
            precio_venta: 1.00,
            stock_minimo: 100,
            stock_maximo: 1000,
            stock_actual: 50,
            activo: true,
            createdAt: '2025-06-01',
            updatedAt: '2025-06-28',
          },
          stock_actual: 50,
          stock_minimo: 100,
          stock_maximo: 1000,
          valor_total: 25.00,
          ultima_entrada: '2025-06-20',
          ultima_salida: '2025-06-27',
          productos_vencidos: 0,
          productos_por_vencer: 5,
        },
        // Más datos de ejemplo...
      ];
      setInventario(mockData);
    } catch (error) {
      console.error('Error loading inventario:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadResumen = async () => {
    try {
      const mockResumen: ResumenInventario = {
        total_productos: 1250,
        valor_total_inventario: 2500000,
        productos_bajo_stock: 15,
        productos_vencidos: 3,
        productos_por_vencer: 25,
      };
      setResumen(mockResumen);
    } catch (error) {
      console.error('Error loading resumen:', error);
    }
  };

  const getStockStatus = (actual: number, minimo: number) => {
    if (actual === 0) return { color: 'error' as const, text: 'Sin stock', icon: <Error /> };
    if (actual <= minimo) return { color: 'warning' as const, text: 'Stock bajo', icon: <Warning /> };
    return { color: 'success' as const, text: 'Disponible', icon: <CheckCircle /> };
  };

  const columns: GridColDef[] = [
    {
      field: 'producto.nombre',
      headerName: 'Producto',
      flex: 1,
      minWidth: 200,
      valueGetter: (params) => params.row.producto?.nombre || '',
    },
    {
      field: 'producto.codigo_barras',
      headerName: 'Código',
      width: 120,
      valueGetter: (params) => params.row.producto?.codigo_barras || '',
    },
    {
      field: 'stock_actual',
      headerName: 'Stock Actual',
      width: 120,
      renderCell: (params) => {
        const status = getStockStatus(params.value, params.row.stock_minimo);
        return (
          <Box display="flex" alignItems="center" gap={1}>
            {status.icon}
            <Typography variant="body2">{params.value}</Typography>
          </Box>
        );
      },
    },
    {
      field: 'stock_minimo',
      headerName: 'Mín/Máx',
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2">
          {params.value} / {params.row.stock_maximo}
        </Typography>
      ),
    },
    {
      field: 'valor_total',
      headerName: 'Valor Total',
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2">{formatCurrency(params.value)}</Typography>
      ),
    },
    {
      field: 'estado',
      headerName: 'Estado',
      width: 120,
      renderCell: (params) => {
        const status = getStockStatus(params.row.stock_actual, params.row.stock_minimo);
        return (
          <Chip
            label={status.text}
            color={status.color}
            size="small"
            icon={status.icon}
          />
        );
      },
    },
    {
      field: 'ultima_entrada',
      headerName: 'Última Entrada',
      width: 130,
      renderCell: (params) => (
        <Typography variant="body2">
          {params.value ? formatDate(params.value) : 'N/A'}
        </Typography>
      ),
    },
    {
      field: 'ultima_salida',
      headerName: 'Última Salida',
      width: 130,
      renderCell: (params) => (
        <Typography variant="body2">
          {params.value ? formatDate(params.value) : 'N/A'}
        </Typography>
      ),
    },
  ];

  if (loading) {
    return <LoadingSpinner message="Cargando inventario..." />;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Inventario General
      </Typography>

      {/* Resumen */}
      {resumen && (
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2 }}>
              <Typography variant="h6" color="primary">
                {resumen.total_productos}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Productos
              </Typography>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2 }}>
              <Typography variant="h6" color="success.main">
                {formatCurrency(resumen.valor_total_inventario)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Valor Total
              </Typography>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2 }}>
              <Typography variant="h6" color="warning.main">
                {resumen.productos_bajo_stock}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Stock Bajo
              </Typography>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2 }}>
              <Typography variant="h6" color="error.main">
                {resumen.productos_vencidos}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Vencidos
              </Typography>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Alertas */}
      {resumen && resumen.productos_bajo_stock > 0 && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {resumen.productos_bajo_stock} productos tienen stock bajo
        </Alert>
      )}
      
      {resumen && resumen.productos_vencidos > 0 && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {resumen.productos_vencidos} productos están vencidos
        </Alert>
      )}

      {/* Filtros */}
      <Card sx={{ mb: 3 }}>
        <Box p={2}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                size="small"
                fullWidth
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box display="flex" gap={1}>
                <Button
                  variant={filtro === 'todos' ? 'contained' : 'outlined'}
                  onClick={() => setFiltro('todos')}
                  size="small"
                >
                  Todos
                </Button>
                <Button
                  variant={filtro === 'bajo_stock' ? 'contained' : 'outlined'}
                  onClick={() => setFiltro('bajo_stock')}
                  size="small"
                  color="warning"
                >
                  Stock Bajo
                </Button>
                <Button
                  variant={filtro === 'vencidos' ? 'contained' : 'outlined'}
                  onClick={() => setFiltro('vencidos')}
                  size="small"
                  color="error"
                >
                  Vencidos
                </Button>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box display="flex" justifyContent="flex-end">
                <Button startIcon={<GetApp />} variant="outlined">
                  Exportar Excel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Card>

      {/* Tabla */}
      <Card>
        <DataGrid
          rows={inventario}
          columns={columns}
          loading={loading}
          autoHeight
          disableSelectionOnClick
          getRowId={(row) => row.producto_id}
          sx={{
            border: 'none',
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
          }}
        />
      </Card>
    </Box>
  );
};

export default InventarioList;