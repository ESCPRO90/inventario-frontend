// src/types/producto.types.ts
export interface Categoria {
  id: number;
  nombre: string;
  descripcion?: string;
  activo: boolean;
}

export interface Producto {
  id: number;
  nombre: string;
  descripcion?: string;
  categoria_id: number;
  categoria?: Categoria;
  precio_compra: number;
  precio_venta: number;
  stock_minimo: number;
  stock_maximo: number;
  stock_actual: number;
  codigo_barras?: string;
  fecha_vencimiento?: string;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductoForm {
  nombre: string;
  descripcion?: string;
  categoria_id: number;
  precio_compra: number;
  precio_venta: number;
  stock_minimo: number;
  stock_maximo: number;
  codigo_barras?: string;
  fecha_vencimiento?: string;
}
