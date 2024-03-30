// ** Axios Imports
import toast from 'react-hot-toast';
import { api } from '@/services/service';


export const postCategory = async (params: any) => {
  const res = await api.post(`categories`, params);

  return res.data;
}

export const getCategory = async (parentId: any) => {
  const res = await api.get(`categories`, { params: { parentId } });


  return res.data;
}
export const getCategorySearch = async (params: any) => {
  const res = await api.get(`categories?search=${params?.search}&isActive=${params?.status}`);


  return res.data;
}

export const deleteCategory = async (params: { id: string }) => {
  const res = await api.delete(`categories/${params.id}`);
  if (res.status == 200) {
    toast.success('Delete category successfully!', { duration: 2000 })
  } else {
    toast.error('Failed to delete category!', { duration: 2000 })
  }

  return res.data;
}

// Get datalistProduct
export const postListProductSelected = async (params: any) => {
  return params;
}


