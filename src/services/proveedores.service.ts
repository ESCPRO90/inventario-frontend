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