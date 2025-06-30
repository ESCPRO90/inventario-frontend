// src/pages/entradas/EntradasList.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  Chip,
  Fab,
} from '@mui/material';
import { Add, Visibility, Edit, Check, Close } from '@mui/icons-material';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { EntradaInventario } from '@/types/entrada.types';
import { usePermissions } from '@/hooks/usePermissions';
import { formatCurrency, formatDate } from '@/utils/formatters';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const EntradasList: React.FC = () => {
  const navigate = useNavigate();
  const permissions = usePermissions();
  const [entradas, setEntradas] = useState<EntradaInventario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEntradas();
  }, []);

  const loadEntradas = async () => {
    try {
      setLoading(true);
      // Mock data
      const mockData: EntradaInventario[] = [
        {
          id: 1,
          numero_entrada: 'ENT-2025-001',
          proveedor_id: 1,
          proveedor: {
            id: 1,
            nombre: 'Farmacéutica ABC',
            contacto: 'Juan Pérez',
            telefono: '2222-3333',
            email: 'contacto@farmabc.com',
            direccion: 'San Salvador',
            activo: true,
            createdAt: '2025-01-01',
            updatedAt: '2025-06-28',
          },
          fecha_entrada: '2025-06-28',
          total: 5000.00,
          observaciones: 'Entrada completa según orden de compra',
          usuario_id: 1,
          estado: 'validada',
          createdAt: '2025-06-28',
          updatedAt: '2025-06-28',
        },
        // Más datos...
      ];
      setEntradas(mockData);
    } catch (error) {
      console.error('Error loading entradas:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'pendiente': return 'warning';
      case 'validada': return 'success';
      case 'anulada': return 'error';
      default: return 'default';
    }
  };

  const handleValidar = async (id: number) => {
    try {
      // await entradasService.validar(id);
      loadEntradas();
    } catch (error) {
      console.error('Error validating entrada:', error);
    }
  };

  const handleAnular = async (id: number) => {
    try {
      // await entradasService.anular(id);
      loadEntradas();
    } catch (error) {
      console.error('Error anulando entrada:', error);
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'numero_entrada',
      headerName: 'Número',
      width: 150,
    },
    {
      field: 'proveedor.nombre',
      headerName: 'Proveedor',
      flex: 1,
      minWidth: 200,
      valueGetter: (params) => params.row.proveedor?.nombre || '',
    },
    {
      field: 'fecha_entrada',
      headerName: 'Fecha',
      width: 120,
      renderCell: (params) => formatDate(params.value),
    },
    {
      field: 'total',
      headerName: 'Total',
      width: 120,
      renderCell: (params) => formatCurrency(params.value),
    },
    {
      field: 'estado',
      headerName: 'Estado',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getEstadoColor(params.value) as any}
          size="small"
        />
      ),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Acciones',
      width: 150,
      getActions: (params) => {
        const actions = [
          <GridActionsCellItem
            icon={<Visibility />}
            label="Ver"
            onClick={() => navigate(`/entradas/${params.row.id}`)}
          />,
        ];

        if (permissions.canUpdate && params.row.estado === 'pendiente') {
          actions.push(
            <GridActionsCellItem
              icon={<Edit />}
              label="Editar"
              onClick={() => navigate(`/entradas/${params.row.id}/edit`)}
            />
          );
        }

        if (permissions.canValidate && params.row.estado === 'pendiente') {
          actions.push(
            <GridActionsCellItem
              icon={<Check />}
              label="Validar"
              onClick={() => handleValidar(params.row.id)}
            />
          );
        }

        if (permissions.canDelete && params.row.estado === 'pendiente') {
          actions.push(
            <GridActionsCellItem
              icon={<Close />}
              label="Anular"
              onClick={() => handleAnular(params.row.id)}
            />
          );
        }

        return actions;
      },
    },
  ];

  if (loading) {
    return <LoadingSpinner message="Cargando entradas..." />;
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          Entradas de Inventario
        </Typography>
        {permissions.canCreate && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate('/entradas/nueva')}
          >
            Nueva Entrada
          </Button>
        )}
      </Box>

      <Card>
        <DataGrid
          rows={entradas}
          columns={columns}
          loading={loading}
          autoHeight
          disableSelectionOnClick
          sx={{
            border: 'none',
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
          }}
        />
      </Card>

      {permissions.canCreate && (
        <Fab
          color="primary"
          aria-label="add"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
          }}
          onClick={() => navigate('/entradas/nueva')}
        >
          <Add />
        </Fab>
      )}
    </Box>
  );
};

export default EntradasList;