import { api } from '@/services/service';

// ** Axios Imports


// ** Fetch Users
export const getProduct = async (params: any = {}) => {
  const res = await api.get('products', { params });

  return res.data;
}

export const getProductSearch = async (params: any = {}) => {
  const res = await api.get('product', { params });

  return res.data;
}


export const deleteProduct = async (params: { _id: string }) => {
  const res = await api.delete(`product/${params?._id}`);

  return res.data;
}


// **
export const postProduct = async (params: { dataForm: any, handleResponse: (res: any) => void, handleError: () => void }) => {

  const { listUrlVideo } = params?.dataForm

  await api.post(`products`, {
    ...params?.dataForm,
    listUrlVideo: [listUrlVideo ? listUrlVideo : '']
  }).then(async (res: any) => {
    params?.handleResponse(res)
  }).catch((err: any) => {
    if (err.response.data?.message == "ProductCodeExisted") {
      params?.handleError()
    }
    console.log(err)
  })
}

export const putProduct = async (params: { id: string, dataForm: any, handleResponse: (res: any) => void, handleError: () => void }) => {

  const { listUrlVideo } = params?.dataForm

  await api.put(`products/${params?.id}`, {
    ...params?.dataForm,
    listUrlVideo: [listUrlVideo ? listUrlVideo : '']
  }).then(async (res: any) => {
    params?.handleResponse(res)
  }).catch((err: any) => {
    if (err.response.data?.message == "ProductCodeExisted") {
      params?.handleError()
    }
    console.log(err)
  })
}


