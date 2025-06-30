// src/types/salida.types.ts
export interface SalidaInventario {
  id: number;
  numero_salida: string;
  cliente_id?: number;
  cliente?: Cliente;
  tipo: 'venta' | 'consignacion' | 'maleta' | 'devolucion';
  fecha_salida: string;
  total: number;
  observaciones?: string;
  usuario_id: number;
  usuario?: User;
  estado: 'pendiente' | 'completada' | 'cancelada';
  detalles?: DetalleSalida[];
  createdAt: string;
  updatedAt: string;
}

export interface DetalleSalida {
  id: number;
  salida_id: number;
  producto_id: number;
  producto?: Producto;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
}

export interface SalidaForm {
  cliente_id?: number;
  tipo: 'venta' | 'consignacion' | 'maleta' | 'devolucion';
  fecha_salida: string;
  observaciones?: string;
  detalles: Array<{
    producto_id: number;
    cantidad: number;
    precio_unitario: number;
  }>;
}