// src/types/cliente.types.ts
export interface Cliente {
  id: number;
  nombre: string;
  tipo: 'hospital' | 'clinica' | 'medico' | 'otro';
  contacto?: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  limite_credito: number;
  credito_usado: number;
  estado_cuenta: 'activo' | 'suspendido' | 'moroso';
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ClienteForm {
  nombre: string;
  tipo: 'hospital' | 'clinica' | 'medico' | 'otro';
  contacto?: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  limite_credito: number;
}