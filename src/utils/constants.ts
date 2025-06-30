// src/utils/constants.ts
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/perfil',
    REGISTER: '/auth/registro',
    CHANGE_PASSWORD: '/auth/cambiar-password',
  },
  PRODUCTOS: {
    BASE: '/productos',
    CATEGORIAS: '/productos/categorias',
    STOCK_BAJO: '/productos/stock-bajo',
    PROXIMOS_VENCER: '/productos/proximos-vencer',
    BUSCAR: '/productos/buscar',
  },
  PROVEEDORES: {
    BASE: '/proveedores',
    BUSCAR: '/proveedores/buscar',
    ESTADISTICAS: '/proveedores/:id/estadisticas',
    PRODUCTOS: '/proveedores/:id/productos',
  },
  CLIENTES: {
    BASE: '/clientes',
    BUSCAR: '/clientes/buscar',
    ESTADO_CUENTA: '/clientes/:id/estado-cuenta',
    VERIFICAR_CREDITO: '/clientes/:id/verificar-credito',
  },
  ENTRADAS: {
    BASE: '/entradas',
    VALIDAR: '/entradas/validar',
    ANULAR: '/entradas/:id/anular',
    ESTADISTICAS: '/entradas/estadisticas',
    RECIENTES: '/entradas/recientes',
    GENERAR_NUMERO: '/entradas/generar-numero',
  },
  SALIDAS: {
    BASE: '/salidas',
    DUPLICAR: '/salidas/:id/duplicar',
    COMPLETAR: '/salidas/:id/completar',
    CANCELAR: '/salidas/:id/cancelar',
    REPORTE: '/salidas/reporte',
    ESTADISTICAS: '/salidas/estadisticas',
  },
  INVENTARIO: {
    BASE: '/inventario',
    RESUMEN: '/inventario/resumen',
    EXPORTAR: '/inventario/exportar',
    KARDEX: '/inventario/kardex/:producto_id',
    AJUSTAR: '/inventario/ajustar',
    TRANSFERIR: '/inventario/transferir',
  },
};

export const USER_ROLES = {
  ADMIN: 'admin',
  BODEGUERO: 'bodeguero',
  FACTURADOR: 'facturador',
  VENDEDOR: 'vendedor',
} as const;

export const STOCK_STATUSES = {
  DISPONIBLE: 'disponible',
  BAJO: 'bajo',
  SIN_STOCK: 'sin_stock',
  VENCIDO: 'vencido',
} as const;

export const MOVEMENT_TYPES = {
  ENTRADA: 'entrada',
  SALIDA: 'salida',
  AJUSTE: 'ajuste',
  TRANSFERENCIA: 'transferencia',
} as const;

export const PAGINATION_LIMITS = [5, 10, 25, 50, 100];

export const DATE_FORMATS = {
  DISPLAY: 'DD/MM/YYYY',
  API: 'YYYY-MM-DD',
  DATETIME: 'DD/MM/YYYY HH:mm',
} as const;