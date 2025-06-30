// src/hooks/usePagination.ts
import { useState } from 'react';

interface PaginationState {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface UsePaginationReturn extends PaginationState {
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setTotal: (total: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  canNextPage: boolean;
  canPrevPage: boolean;
  reset: () => void;
}

export function usePagination(initialLimit = 10): UsePaginationReturn {
  const [state, setState] = useState<PaginationState>({
    page: 1,
    limit: initialLimit,
    total: 0,
    totalPages: 0,
  });

  const setPage = (page: number) => {
    setState(prev => ({ ...prev, page }));
  };

  const setLimit = (limit: number) => {
    setState(prev => ({ 
      ...prev, 
      limit, 
      page: 1,
      totalPages: Math.ceil(prev.total / limit)
    }));
  };

  const setTotal = (total: number) => {
    setState(prev => ({ 
      ...prev, 
      total,
      totalPages: Math.ceil(total / prev.limit)
    }));
  };

  const nextPage = () => {
    setState(prev => ({
      ...prev,
      page: Math.min(prev.page + 1, prev.totalPages)
    }));
  };

  const prevPage = () => {
    setState(prev => ({
      ...prev,
      page: Math.max(prev.page - 1, 1)
    }));
  };

  const reset = () => {
    setState(prev => ({ ...prev, page: 1, total: 0, totalPages: 0 }));
  };

  return {
    ...state,
    setPage,
    setLimit,
    setTotal,
    nextPage,
    prevPage,
    canNextPage: state.page < state.totalPages,
    canPrevPage: state.page > 1,
    reset,
  };
}