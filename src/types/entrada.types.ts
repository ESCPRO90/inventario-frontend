// src/types/entrada.types.ts
export interface EntradaInventario {
  id: number;
  numero_entrada: string;
  proveedor_id: number;
  proveedor?: Proveedor;
  fecha_entrada: string;
  fecha_vencimiento?: string;
  numero_lote?: string;
  total: number;
  observaciones?: string;
  usuario_id: number;
  usuario?: User;
  estado: 'pendiente' | 'validada' | 'anulada';
  detalles?: DetalleEntrada[];
  createdAt: string;
  updatedAt: string;
}

export interface DetalleEntrada {
  id: number;
  entrada_id: number;
  producto_id: number;
  producto?: Producto;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
}

export interface EntradaForm {
  proveedor_id: number;
  fecha_entrada: string;
  fecha_vencimiento?: string;
  numero_lote?: string;
  observaciones?: string;
  detalles: Array<{
    producto_id: number;
    cantidad: number;
    precio_unitario: number;
  }>;
}