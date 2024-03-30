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
const defaultValues: any = {
    userId: '',
    description: "",
    name: '',
    price: '',
    image: '',
    countInStock: '',
    category: '',
    isSale: false,
}

const schema: any = yup.object().shape({
    userId: yup.string().required(),
    name: yup.string().required(),
    price: yup.string().required(),
    countInStock: yup.string().required(),
    category: yup.string().required(),
    image: yup.string().notRequired(),
    isSale: yup.boolean().required(),
    description: yup.string().notRequired().max(300, "Mô tả không nhập quá 300 kí tự!"),
})


type Props = {
    id: string
    onCloseDrawer: () => void
    common: any
}




const useAddEditProduct = ({ id, onCloseDrawer, common }: Props) => {
    // ** Props

    const [dataCategory, setDataCategory] = useState<any>('')

    const refAutocomplete: any = useRef()
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


    const onSubmit = (dataForm: any) => {


    }

    return {
        handleSubmit,
        onSubmit,
        control,
        errors,
        refAutocomplete,
        setValue,
        register,
        getValues,
        setError,
        clearErrors,
        watch,
        dialog, setDialog, setDataCategory
    }
}

export default useAddEditProduct