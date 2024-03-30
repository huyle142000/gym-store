// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import toast from 'react-hot-toast';
import { api } from '@/services/service';

interface Redux {
    getState: any
    dispatch: Dispatch<any>
}


export const getOrder = createAsyncThunk('orders/getData', async () => {
    const res = await api.get(`orders`);

    return res.data;
})


export const getOrderOnSearch = createAsyncThunk('orders/getData', async (params: { searchValue: string, status: any }) => {
    const res = await api.get(`orders?search=${params.searchValue}&status=${params.status}`);
    return res.data;
})

export const deleteOrder = createAsyncThunk('orders/getDataHistory', async (params: any, { dispatch }: Redux) => {
    const res = await api.delete(`orders/${params?.id}`);
    if (res.status == 200 || res.status == 201) {
        toast.success("Delete order successfully!", { duration: 2000 })
    }
    return res.data;
})



export const approvalOrders = createAsyncThunk('order-Orders/approval', async (params: any, { dispatch }: Redux) => {
    let res: any
    try {
        res = await api.put(`orders/${params.id}/changeStatus`, {
            status: params?.status
        });
        if (res.status == 200 || res.status == 201) {
            toast.success("Confirm successfully!", { duration: 2000 })

        }
    } catch (error: any) {
        if (error.response.data.message == "Forbidden") {
            toast.error('Failed to approvel order which is approveled', { duration: 2000 })

            return
        }
        toast.error('Failed to confirm order!', { duration: 2000 })
    }

    return res.data ? res.data : [];
})


export const putAdminNoteOrders = createAsyncThunk('order-Orders/putAdminNoteOrders', async (params: any, { dispatch }: Redux) => {
    let res: any
    try {
        res = await api.put(`orders/${params.id}/noteOfAdmin`, {
            noteOfAdmin: params?.noteOfAdmin
        });

        if (res.status == 200 || res.status == 201) {
            if (params?.isNotify) {
                toast.success("Confirm successfully!", { duration: 2000 })
            }
        }
    } catch (error: any) {
        if (error.response.data.message == "Forbidden") {
            if (params?.isNotify) {
                toast.error('Failed to confirm order which is approveled!', { duration: 2000 })

            }
            return
        }
        if (params?.isNotify) {
            toast.error('Failed to confirm order!', { duration: 2000 })
        }
    }

    return res.data ? res.data : [];
})


export const orderSlice = createSlice({
    name: 'orderSlice',
    initialState: {
        total: 0,
        data: [],
    },
    reducers: {},

    extraReducers: builder => {
        builder.addCase(getOrder.fulfilled, (state, action) => {
            const clone: any = Array.isArray(action.payload.data) ? [...action.payload.data] : [];
            if (action.payload.data && action.payload.data.length > 0) {
                state.data = clone.reverse()
            } else {
                state.data = []
            }
            state.total = action.payload.total

        })

    }
})

export default orderSlice.reducer
