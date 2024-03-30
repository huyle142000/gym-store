// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import toast from 'react-hot-toast';
import { api } from '@/services/service';


export const postChildSubCategory = async (params: any) => {
  const res = await api.post(`child-sub-categories`, params);

  return res.data;
}

export const getChildSubCategory = async () => {
  const res = await api.get(`child-sub-categories`);


  return res.data;
}
export const getChildSubCategorySearch = async (params: any) => {
  const res = await api.get(`child-sub-categories?search=${params?.search}&isActive=${params?.status}`);


  return res.data;
}

export const deleteChildSubCategory = async (params: { id: string }) => {
  const res = await api.delete(`child-sub-categories/${params.id}`);
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


