// src/utils/storage.ts
export const storage = {
  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error);
      return defaultValue || null;
    }
  },

  set: <T>(key: string, value: T): boolean => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
      return false;
    }
  },

  remove: (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
      return false;
    }
  },

  clear: (): boolean => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },
};('Error loading categorias:', error);
    }
  };

  const loadProducto = async () => {
    if (!productId) return;
    
    try {
      const response = await productosService.getById(productId);
      const producto = response.data;
      
      setValue('nombre', producto.nombre);
      setValue('descripcion', producto.descripcion || '');
      setValue('categoria_id', producto.categoria_id);
      setValue('precio_compra', producto.precio_compra);
      setValue('precio_venta', producto.precio_venta);
      setValue('stock_minimo', producto.stock_minimo);
      setValue('stock_maximo', producto.stock_maximo);
      setValue('codigo_barras', producto.codigo_barras || '');
      
      if (producto.fecha_vencimiento) {
        setFechaVencimiento(dayjs(producto.fecha_vencimiento));
        setTieneFechaVencimiento(true);
      }
    } catch (error) {
      console.error