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


const defaultValues = {
    name: '',
    description: '',
    childCategories: [],
}

const schema: any = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().notRequired().max(300, "Mô tả không nhập quá 300 kí tự!"),
    childCategories: yup.string().required(),
})


type Props = {
    id: string
    onCloseDrawer: () => void
}




const useAddEditSubCategory = ({ id, onCloseDrawer }: Props) => {
    // ** Props

    const [data, setData] = useState<any>('')
    const refAutocomplete: any = useRef()
    const {
        control,
        reset,
        setValue,
        getValues,
        setError,
        handleSubmit,
        clearErrors,
        formState: { errors }
    } = useForm<any>({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    })


    const getBusinessSector = () => {
        api.get(`fields/${id}`).then((response: any) => {
            setData(response.data)

            reset(response.data)

        }).catch(() => {
            reset()
        })
    }

    useEffect(() => {

        if (id) {
            reset({ ...defaultValues })
            getBusinessSector()
        } else {

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

                description: description ? description : '',
                category: category ? category : ''
            }).then((res: any) => {
                if (res) {
                    toast.custom((t) => (
                        <ToastNotify typeNotify="success" idPopUp={t?.id}

                            contentOfNotify={<span>
                                Thêm lĩnh vực <b style={{ color: '#636366', fontWeight: '600' }}>{ }</b> thành công!
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
        refAutocomplete,
        setValue,
        getValues,
        setError,
        clearErrors,
    }
}

export default useAddEditSubCategory