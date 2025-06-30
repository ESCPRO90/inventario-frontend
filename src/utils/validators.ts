// src/utils/validators.ts
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9+\-\s()]{8,15}$/;
  return phoneRegex.test(phone);
};

export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (password.length < 6) {
    errors.push('Debe tener al menos 6 caracteres');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Debe contener al menos una letra mayúscula');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Debe contener al menos una letra minúscula');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Debe contener al menos un número');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateStockValues = (stockActual: number, stockMinimo: number, stockMaximo: number): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (stockMinimo < 0) {
    errors.push('El stock mínimo no puede ser negativo');
  }
  
  if (stockMaximo < 0) {
    errors.push('El stock máximo no puede ser negativo');
  }
  
  if (stockActual < 0) {
    errors.push('El stock actual no puede ser negativo');
  }
  
  if (stockMinimo >= stockMaximo) {
    errors.push('El stock mínimo debe ser menor al máximo');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};
