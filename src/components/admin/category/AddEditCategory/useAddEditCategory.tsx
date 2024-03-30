import { useState, useEffect, } from 'react'

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


const defaultValues = {
    description: "",
}

const schema = yup.object().shape({
    description: yup.string().notRequired().max(300, "Mô tả không nhập quá 300 kí tự!"),
})


type Props = {
    id: string
    onCloseDrawer: () => void
}




const useAddEditCategory = ({ id, onCloseDrawer }: Props) => {
    // ** Props
    const [toggleButton, setToggleButton] = useState<string>('nameVi')
    const [nameVi, setNameVi] = useState<string>('')
    const [nameEn, setNameEn] = useState<string>('')
    const [data, setData] = useState<any>('')

    const {
        control,
        reset,
        setValue,
        getValues,
        setError,
        handleSubmit,
        clearErrors,
        formState: { errors }
    } = useForm({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    })


    const getBusinessSector = () => {
        api.get(`fields/${id}`).then((response: any) => {
            setData(response.data)

            reset(response.data)
            setNameVi(response?.data?.nameVi)
            setNameEn(response?.data?.nameEn)
        }).catch(() => {
            reset()
        })
    }

    useEffect(() => {

        if (id) {
            reset({ ...defaultValues })
            getBusinessSector()
        } else {
            setNameVi('')
            setNameEn('')
            reset({ ...defaultValues })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])


    const onSubmit = (dataForm: any) => {

        const {
            description,
            category
        } = dataForm

        if (id) {
            api.put(`fields/${id}`, {
                nameVi: nameVi ? nameVi : '',
                nameEn: nameEn ? nameEn : '',
                description: description ? description : '',
                category: category ? category : ''
            }).then((res: any) => {
                if (res) {
                    onCloseDrawer()
                }
                toast.custom((t) => (
                    <ToastNotify typeNotify="success" idPopUp={t?.id}
                        contentOfNotify={<span>
                            Chỉnh sửa lĩnh vực <b style={{ color: '#636366', fontWeight: '600' }}>{data?.nameVi}</b> thành công!
                        </span>}
                    />

                ));
            }).catch((err: any) => {

                reset()
            })
        } else {
            api.post("fields", {
                nameVi: nameVi ? nameVi : '',
                nameEn: nameEn ? nameEn : '',
                description: description ? description : '',
                category: category ? category : ''
            }).then((res: any) => {
                if (res) {
                    toast.custom((t) => (
                        <ToastNotify typeNotify="success" idPopUp={t?.id}

                            contentOfNotify={<span>
                                Thêm lĩnh vực <b style={{ color: '#636366', fontWeight: '600' }}>{nameVi}</b> thành công!
                            </span>}
                        />

                    ));
                    onCloseDrawer()

                }

            }).catch((err) => {
                console.log(err, "err    ")

            })
        }

    }

    return {
        handleSubmit,
        onSubmit,
        control,
        errors,
        toggleButton,
        nameVi,
        nameEn,
        setToggleButton,
        setNameVi,
        setNameEn,
        setValue,
        getValues,
        setError,
        clearErrors,
    }
}

export default useAddEditCategory