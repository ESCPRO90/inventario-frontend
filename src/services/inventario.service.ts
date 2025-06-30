// src/services/inventario.service.ts
import { InventarioItem, ResumenInventario } from '@/types/inventario.types';
import { PaginationParams } from '@/types/api.types';
import { apiService } from './api';

export class InventarioService {
  async getAll(params?: PaginationParams) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);

    const url = `/inventario${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiService.get<InventarioItem[]>(url);
  }

  async getResumen() {
    return apiService.get<ResumenInventario>('/inventario/resumen');
  }

  async exportar(formato: 'excel' | 'pdf' = 'excel') {
    return apiService.get(`/inventario/exportar?formato=${formato}`, {
      responseType: 'blob',
    } as any);
  }

  async getKardex(productoId: number, fechaInicio?: string, fechaFin?: string) {
    const params = new URLSearchParams();
    if (fechaInicio) params.append('fechaInicio', fechaInicio);
    if (fechaFin) params.append('fechaFin', fechaFin);

    const url = `/inventario/kardex/${productoId}${params.toString() ? `?${params.toString()}` : ''}`;
    return apiService.get(url);
  }

  async ajustar(data: {
    producto_id: number;
    cantidad_ajuste: number;
    tipo_ajuste: 'suma' | 'resta';
    motivo: string;
  }) {
    return apiService.post('/inventario/ajustar', data);
  }

  async transferir(data: {
    productos: Array<{
      producto_id: number;
      cantidad: number;
    }>;
    destino: string;
    observaciones?: string;
  }) {
    return apiService.post('/inventario/transferir', data);
  }
}

export const inventarioService = new InventarioService();