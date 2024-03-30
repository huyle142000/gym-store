import { api } from '@/services/service'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import * as yup from 'yup';

const defaultValues = {
    email: '',
    name: '',
    phone: '',
    subscribed: false
}
const schema = yup.object().shape({
    email: yup
        .string()
        .trim(),

    name: yup
        .string()
        .trim()
        .min(3, 'Please enter at least 3 characters')
        .required('Customer’s name is required'),
    phone: yup.string().required('Phone number is required').min(7, 'Please enter 7-15 digits for the phone number').max(15, 'Please enter 7-15 digits for the phone number'),
})
const useAddEditUser = (id: string, onCloseDrawer: any) => {
    const {
        control,
        reset,
        clearErrors,
        setError,
        handleSubmit,
        getValues,
        formState: { errors }
    } = useForm({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    })
    const getCustomerByID = () => {
        api.get(`customers/${id}`).then((response: any) => {
            reset(response.data)
        }).catch(() => {
            reset()
        })
    }

    useEffect(() => {

        if (id !== null) {
            getCustomerByID()

        } else {
            clearErrors()
            reset({ ...defaultValues })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const onSubmit = async (dataForm: any) => {

        if (id !== null) {

            api.put(`customers/${id}`, {
                ...dataForm,
            }).then(() => {
                toast.success('Edit customer successfully!', { duration: 2000 })
                onCloseDrawer()

            }).catch((err) => {
                console.log(err, "err")

                toast.error('Failed to edit customer!', { duration: 2000 })
            })
        } else {
            await api.post(`customers`, {
                ...dataForm,
            }).then(async (res: any) => {

                reset()
                await onCloseDrawer()
                toast.success('Create customer successfully!', { duration: 2000 })
            }).catch((err) => {
                console.log(err, "err")

                toast.error('Failed create customer!', { duration: 2000 })
            })
        }
    }


    return {
        handleSubmit,
        control,
        setError,
        errors,
        onSubmit,
        getValues
    }
}

export default useAddEditUser