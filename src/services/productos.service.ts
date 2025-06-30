// src/services/productos.service.ts
import { Producto, ProductoForm, Categoria } from '@/types/producto.types';
import { PaginationParams } from '@/types/api.types';
import { apiService } from './api';

export class ProductosService {
  async getAll(params?: PaginationParams) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params?.sortOrder) queryParams.append('sortOrder', params.sortOrder);

    const url = `/productos${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiService.get<Producto[]>(url);
  }

  async getById(id: number) {
    return apiService.get<Producto>(`/productos/${id}`);
  }

  async create(data: ProductoForm) {
    return apiService.post<Producto>('/productos', data);
  }

  async update(id: number, data: Partial<ProductoForm>) {
    return apiService.put<Producto>(`/productos/${id}`, data);
  }

  async delete(id: number) {
    return apiService.delete(`/productos/${id}`);
  }

  async getStockBajo() {
    return apiService.get<Producto[]>('/productos/stock-bajo');
  }

  async getProximosVencer() {
    return apiService.get<Producto[]>('/productos/proximos-vencer');
  }

  async buscar(search: string) {
    return apiService.get<Producto[]>(`/productos/buscar?q=${encodeURIComponent(search)}`);
  }

  // Categorías
  async getCategorias() {
    return apiService.get<Categoria[]>('/productos/categorias/listar');
  }

  async createCategoria(data: { nombre: string; descripcion?: string }) {
    return apiService.post<Categoria>('/productos/categorias', data);
  }

  async updateCategoria(id: number, data: { nombre: string; descripcion?: string }) {
    return apiService.put<Categoria>(`/productos/categorias/${id}`, data);
  }

  async deleteCategoria(id: number) {
    return apiService.delete(`/productos/categorias/${id}`);
  }
}

export const productosService = new ProductosService();

// src/services/proveedores.service.ts
import { Proveedor, ProveedorForm } from '@/types/proveedor.types';
import { PaginationParams } from '@/types/api.types';
import { apiService } from './api';

export class ProveedoresService {
  async getAll(params?: PaginationParams) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);

    const url = `/proveedores${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiService.get<Proveedor[]>(url);
  }

  async getById(id: number) {
    return apiService.get<Proveedor>(`/proveedores/${id}`);
  }

  async create(data: ProveedorForm) {
    return apiService.post<Proveedor>('/proveedores', data);
  }

  async update(id: number, data: Partial<ProveedorForm>) {
    return apiService.put<Proveedor>(`/proveedores/${id}`, data);
  }

  async delete(id: number) {
    return apiService.delete(`/proveedores/${id}`);
  }

  async buscar(search: string) {
    return apiService.get<Proveedor[]>(`/proveedores/buscar?q=${encodeURIComponent(search)}`);
  }

  async getEstadisticas(id: number) {
    return apiService.get(`/proveedores/${id}/estadisticas`);
  }

  async getProductos(id: number) {
    return apiService.get(`/proveedores/${id}/productos`);
  }
}

export const proveedoresService = new ProveedoresService();
