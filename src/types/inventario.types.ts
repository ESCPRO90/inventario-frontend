// src/types/inventario.types.ts
export interface InventarioItem {
  producto_id: number;
  producto?: Producto;
  stock_actual: number;
  stock_minimo: number;
  stock_maximo: number;
  valor_total: number;
  ultima_entrada?: string;
  ultima_salida?: string;
  productos_vencidos: number;
  productos_por_vencer: number;
}

export interface ResumenInventario {
  total_productos: number;
  valor_total_inventario: number;
  productos_bajo_stock: number;
  productos_vencidos: number;
  productos_por_vencer: number;
}