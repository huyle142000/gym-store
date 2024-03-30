// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import toast from 'react-hot-toast';
import { api } from '@/services/service';



export const getUsers = async () => {
  const res = await api.get(`user`);
  return res.data;
}

export const getUserSearch = async (params: any) => {
  const res = await api.get(`users?search=${params?.search}&subscribed=${params?.status}`);


  return res.data;
}

export const deleteUser = async (params: { id: string }) => {
  const res = await api.delete(`users/${params.id}`);
  if (res.status == 200) {
    toast.success('Delete customer successfully!', { duration: 2000 })
  } else {
    toast.error('Failed to delete customer!', { duration: 2000 })
  }

  return res.data;
}



