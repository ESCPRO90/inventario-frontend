// src/services/entradas.service.ts
import { EntradaInventario, EntradaForm } from '@/types/entrada.types';
import { PaginationParams } from '@/types/api.types';
import { apiService } from './api';

export class EntradasService {
  async getAll(params?: PaginationParams) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);

    const url = `/entradas${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiService.get<EntradaInventario[]>(url);
  }

  async getById(id: number) {
    return apiService.get<EntradaInventario>(`/entradas/${id}`);
  }

  async create(data: EntradaForm) {
    return apiService.post<EntradaInventario>('/entradas', data);
  }

  async validar(id: number) {
    return apiService.post(`/entradas/validar`, { entrada_id: id });
  }

  async anular(id: number, motivo?: string) {
    return apiService.post(`/entradas/${id}/anular`, { motivo });
  }

  async getEstadisticas() {
    return apiService.get('/entradas/estadisticas');
  }

  async getRecientes() {
    return apiService.get<EntradaInventario[]>('/entradas/recientes');
  }

  async generarNumero() {
    return apiService.get<{ numero: string }>('/entradas/generar-numero');
  }
}

export const entradasService = new EntradasService();