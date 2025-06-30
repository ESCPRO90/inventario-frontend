// src/types/common.types.ts
export interface SelectOption {
  value: number | string;
  label: string;
}

export interface TableColumn {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'left' | 'center' | 'right';
  format?: (value: any) => string;
}

export interface FilterConfig {
  field: string;
  operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan';
  value: any;
}

export interface DashboardStats {
  total_productos: number;
  total_proveedores: number;
  total_clientes: number;
  valor_inventario: number;
  entradas_mes: number;
  salidas_mes: number;
  productos_bajo_stock: number;
  productos_vencidos: number;
}