
// src/pages/ProductosPage.tsx
import { useEffect, useState } from 'react'
import { getProductos } from '../services/productoService'

function ProductosPage() {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    getProductos().then(setProductos)
  }, [])

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Listado de Productos</h1>
      <table className='w-full table-auto border'>
        <thead>
          <tr className='bg-gray-100'>
            <th className='border p-2'>Código</th>
            <th className='border p-2'>Descripción</th>
            <th className='border p-2'>Referencia</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p: any) => (
            <tr key={p.id}>
              <td className='border p-2'>{p.codigo}</td>
              <td className='border p-2'>{p.descripcion}</td>
              <td className='border p-2'>{p.referencia}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default ProductosPage