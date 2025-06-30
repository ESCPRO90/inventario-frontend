// src/hooks/usePermissions.ts
import { useAuth } from '@/context/AuthContext';

interface Permissions {
  canCreate: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  canValidate: boolean;
  canViewReports: boolean;
}

const rolePermissions: Record<string, Permissions> = {
  admin: {
    canCreate: true,
    canRead: true,
    canUpdate: true,
    canDelete: true,
    canValidate: true,
    canViewReports: true,
  },
  bodeguero: {
    canCreate: true,
    canRead: true,
    canUpdate: true,
    canDelete: false,
    canValidate: true,
    canViewReports: true,
  },
  facturador: {
    canCreate: true,
    canRead: true,
    canUpdate: true,
    canDelete: false,
    canValidate: false,
    canViewReports: true,
  },
  vendedor: {
    canCreate: false,
    canRead: true,
    canUpdate: false,
    canDelete: false,
    canValidate: false,
    canViewReports: false,
  },
};

export function usePermissions(): Permissions {
  const { user } = useAuth();
  
  if (!user || !user.rol) {
    return {
      canCreate: false,
      canRead: false,
      canUpdate: false,
      canDelete: false,
      canValidate: false,
      canViewReports: false,
    };
  }

  return rolePermissions[user.rol] || rolePermissions.vendedor;
}