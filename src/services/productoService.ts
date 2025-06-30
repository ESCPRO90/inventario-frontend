import axiosInstance from './axiosConfig'

export const getProductos = async () => {
  const res = await axiosInstance.get('/productos')
  return res.data
}
