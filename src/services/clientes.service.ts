// src/services/clientes.service.ts - Completar servicios restantes
import { Cliente, ClienteForm } from '@/types/cliente.types';
import { PaginationParams } from '@/types/api.types';
import { apiService } from './api';

export class ClientesService {
  async getAll(params?: PaginationParams) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);

    const url = `/clientes${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiService.get<Cliente[]>(url);
  }

  async getById(id: number) {
    return apiService.get<Cliente>(`/clientes/${id}`);
  }

  async create(data: ClienteForm) {
    return apiService.post<Cliente>('/clientes', data);
  }

  async update(id: number, data: Partial<ClienteForm>) {
    return apiService.put<Cliente>(`/clientes/${id}`, data);
  }

  async delete(id: number) {
    return apiService.delete(`/clientes/${id}`);
  }

  async buscar(search: string) {
    return apiService.get<Cliente[]>(`/clientes/buscar?q=${encodeURIComponent(search)}`);
  }

  async getEstadoCuenta(id: number) {
    return apiService.get(`/clientes/${id}/estado-cuenta`);
  }

  async verificarCredito(id: number, monto: number) {
    return apiService.get(`/clientes/${id}/verificar-credito?monto=${monto}`);
  }
}

export const clientesService = new ClientesService();
