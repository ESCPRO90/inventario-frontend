// src/pages/productos/ProductosForm.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import ProductForm from '@/components/forms/ProductForm';

const ProductosForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = id && id !== 'nuevo' ? parseInt(id, 10) : undefined;

  return <ProductForm productId={productId} />;
};

export default ProductosForm;