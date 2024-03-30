import { useState, useEffect, useRef, } from 'react'

// ** MUI Imports

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, } from 'react-hook-form'

// ** Icons Imports

//**Utils */
import toast from 'react-hot-toast'
import { api } from '@/services/service'
import ToastNotify from '@/shared/ToastNotify'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutationState } from '@tanstack/react-query'
import { RequestProcessor } from '@/services/requestProcessor'
import { getLabelById, postLabel } from '@/store/app/label'
import { Label } from '@/types/label'
const defaultValues: any = {
   
    description: "",
    name: '',
}

const schema: any = yup.object().shape({
    name: yup.string().required("Nhập tên nhãn!"),
    description: yup.string().notRequired().max(300, "Mô tả không nhập quá 300 kí tự!"),
})


type Props = {
    id: string
    onCloseDrawer: () => void
    common: any
}




const useAddEditLabel = ({ id, onCloseDrawer, common }: Props) => {
    // ** Props

    const {
        control,
        reset,
        setValue,
        getValues,
        setError,
        register,
        watch,
        handleSubmit,
        clearErrors,
        formState: { errors }
    } = useForm<any>({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    })


    // VI/EN
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])



    // Drawer
    const [dialog, setDialog] = useState(false)

    // 
    const { useMutate, useQueryWrapper } = RequestProcessor()

    const postLabelAPI = useMutate(
        'label', // Unique key to identify the mutation
        async (newCategoryData: any) => {
            console.log(newCategoryData,"newCategoryData")
            try {

                const response: any = await postLabel(newCategoryData)

                reset({ ...defaultValues })
                return response.json(); // Parse response data if needed
            } catch (error) {
                console.error('Label posting failed:', error);
                throw error; // Re-throw to handle errors in components
            }
        },
    );

    useQueryWrapper('label', async () => {
        const response: any = await getLabelById(id)

        if (!response.ok) {
            throw new Error('Failed to fetch label');
        }
        const data = await response.json();
        // Cập nhật giá trị của các trường
        // setValue('name', data.name);
        // setValue('description', data.description);
        reset({
            ...defaultValues,
            data
        })
        console.log(123123)
    }, { enabled: !!id });



    const onSubmit = (dataForm: any) => {
        console.log(dataForm,"dataForm")
        postLabelAPI.mutate(dataForm)
    }

    return {
        handleSubmit,
        onSubmit,
        control,
        errors,
        setValue,
        register,
        getValues,
        setError,
        clearErrors,
        watch,
        dialog, setDialog
    }
}

export default useAddEditLabel