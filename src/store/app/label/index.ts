import { api } from '@/services/service';

// ** Axios Imports


// ** Fetch Users
export const getLabel = async (params: any = {}) => {
  const res = await api.get('labels', { params });

  return res.data;
}

export const getLabelById = async (params: any = {}) => {
  const res = await api.get(`labels/${params?.id}`);

  return res.data;
}

export const getLabelSearch = async (params: any = {}) => {
  const res = await api.get('labels', { params });

  return res.data;
}


export const deleteLabel = async (params: { _id: string }) => {
  const res = await api.delete(`labels/${params?._id}`);

  return res.data;
}


// **
export const postLabel = async (params: { dataForm: any, handleResponse: (res: any) => void, handleError: () => void }) => {
console.log(params,"params")

  await api.post(`labels`, {
    ...params,
  }).then(async (res: any) => {
    params?.handleResponse(res)
  }).catch((err: any) => {
    if (err.response.data?.message == "LabelCodeExisted") {
      params?.handleError()
    }
    console.log(err)
  })
}

export const putLabel = async (params: { id: string, dataForm: any, handleResponse: (res: any) => void, handleError: () => void }) => {

  await api.put(`labels/${params?.id}`, {
    ...params?.dataForm,
  }).then(async (res: any) => {
    params?.handleResponse(res)
  }).catch((err: any) => {
    if (err.response.data?.message == "LabelCodeExisted") {
      params?.handleError()
    }
    console.log(err)
  })
}


