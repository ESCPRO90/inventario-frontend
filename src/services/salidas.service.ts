// src/services/salidas.service.ts
import { SalidaInventario, SalidaForm } from '@/types/salida.types';
import { PaginationParams } from '@/types/api.types';
import { apiService } from './api';

export class SalidasService {
  async getAll(params?: PaginationParams) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);

    const url = `/salidas${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiService.get<SalidaInventario[]>(url);
  }

  async getById(id: number) {
    return apiService.get<SalidaInventario>(`/salidas/${id}`);
  }

  async create(data: SalidaForm) {
    return apiService.post<SalidaInventario>('/salidas', data);
  }

  async update(id: number, data: Partial<SalidaForm>) {
    return apiService.put<SalidaInventario>(`/salidas/${id}`, data);
  }

  async duplicar(id: number) {
    return apiService.post<SalidaInventario>(`/salidas/${id}/duplicar`);
  }

  async completar(id: number) {
    return apiService.patch(`/salidas/${id}/completar`);
  }

  async cancelar(id: number, motivo?: string) {
    return apiService.patch(`/salidas/${id}/cancelar`, { motivo });
  }

  async delete(id: number) {
    return apiService.delete(`/salidas/${id}`);
  }

  async getReporte(params: any) {
    return apiService.get('/salidas/reporte', { params });
  }

  async getEstadisticas() {
    return apiService.get('/salidas/estadisticas');
  }
}

export const salidasService = new SalidasService();