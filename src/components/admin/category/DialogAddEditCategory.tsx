import React, { useState } from 'react'
import {
    DialogContent, IconButton, TextField, FormControl, FormHelperText, Dialog,
    DialogTitle,
    Button,
    Stack,
    Typography,
    Box,
} from '@mui/material'

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import { RequestProcessor } from '@/services/requestProcessor';
import { postCategory } from '@/store/app/category';
import { FormPostCategory } from '@/types/categories';

// 
import * as yup from 'yup'
import { Controller, useForm, } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'


type Props = {
    openDialog: boolean
    handleCloseDialog: () => void
    selectedValue: any
    setSelectedItem: any
    setSelectedValue: any

}

const defaultValues = {
    name: '',
    nameEn: '',
    description: '',
    descriptionEn: '',
}


const DialogAddEditCategory = ({
    openDialog, handleCloseDialog, selectedValue, setSelectedItem, setSelectedValue
}: Props) => {
    const schema = yup.object().shape({
        name: yup.string().required(`Nhập tên danh mục!`),
        nameEn: yup.string().notRequired(),
        description: yup.string().notRequired().max(200, `Mô tả không vượt quá 200 ký tự!`),
    })

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    })

    const { useMutate } = RequestProcessor()

    const postCategoryAPI = useMutate(
        'category', // Unique key to identify the mutation
        async (newCategoryData: FormPostCategory) => {
            try {

                const response = await postCategory({ dataForm: newCategoryData })

                setSelectedItem((prev: any) => {
                    prev?.map((old: any) => {
                        old.children = []
                        return old
                    })
                })
                handleCloseDialog()
                setSelectedValue(null)
                reset({ ...defaultValues })
                return response.json(); // Parse response data if needed
            } catch (error) {
                console.error('Category posting failed:', error);
                throw error; // Re-throw to handle errors in components
            }
        },
    );

    const onSubmit = (data: any) => {
        console.log(selectedValue, "selectedValue")
        const dataFormAPI: any = {
            name: data?.name,
            description: data?.description,
            isRoot: selectedValue?.isRoot,
            parentId: selectedValue?._id
        }
        postCategoryAPI.mutate(dataFormAPI)
    }
    return (
        <>
            {<Dialog open={openDialog} onClose={handleCloseDialog}
                sx={{ '& .MuiPaper-root': { width: 'fit-content', p: 2, borderRadius: '24px' } }}
            >
                <DialogTitle id='alert-dialog-title'>
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Typography sx={{ fontWeight: '500', fontSize: '20px' }}>{selectedValue?.name}</Typography>
                        <IconButton onClick={() => handleCloseDialog()} sx={{ color: 'text.primary' }}>
                            <CloseRoundedIcon />
                        </IconButton>
                    </Stack>
                </DialogTitle>
                <DialogContent >
                    <form noValidate onSubmit={handleSubmit(onSubmit)}>
                        <FormControl sx={{ width: '100%', mt: 2, mb: 1, '& .MuiFormLabel-root': { fontWeight: '500', color: 'text.primary' } }}>
                            <Controller
                                name={"name"}
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { onChange, value } }: any) => (
                                    <TextField
                                        value={value}
                                        placeholder={selectedValue?.placeholder}
                                        label={
                                            <span className='titleLabel'>
                                                {selectedValue?.label}<span className='color_red'> *</span>
                                            </span>
                                        }

                                        onChange={onChange}

                                        error={Boolean(errors.name)}

                                    />
                                )} />
                            {errors.name && <FormHelperText sx={{ color: 'error.main', fontStyle: 'italic', marginLeft: '0' }}>{errors.name.message}</FormHelperText>}


                        </FormControl>

                        <FormControl fullWidth>
                            <Controller
                                name={"description"}
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { onChange, value } }: any) => (
                                    <Box sx={{ position: 'relative', width: '100%', mt: 2 }}>
                                        <TextField
                                            value={value}
                                            label={
                                                <Box sx={{ position: 'relative' }}>
                                                    <span className='titleLabel'>
                                                        Mô tả
                                                    </span>
                                                    <span style={{ color: '#949499', fontSize: '14px', fontWeight: '500', position: 'absolute', top: 0, right: '-8px', transform: 'translateX(100%)' }}>{value}/200</span>
                                                </Box>

                                            }
                                            rows={3}
                                            sx={{
                                                width: '100%', '& textarea': {
                                                    paddingRight: '70px'
                                                }
                                            }}
                                            multiline
                                            placeholder={"Mô tả"}

                                            onChange={onChange}

                                            error={Boolean(errors.description)}

                                        />

                                    </Box>

                                )} />

                            {errors.description && <FormHelperText sx={{ color: 'error.main', fontStyle: 'italic', marginLeft: '0' }}>{errors.description.message}</FormHelperText>}


                        </FormControl>

                        <Button startIcon={<DoneAllOutlinedIcon />}
                            color='primary'
                            variant='contained'
                            sx={{
                                textAlign: 'center',
                                width: "100%",
                                borderRadius: '20px',
                                textTransform: 'none',
                                mb: 3,
                                mt: 3

                            }}
                            type='submit'
                        >
                            Lưu
                        </Button>
                    </form>

                </DialogContent>
            </Dialog>}
        </>
    )
}

export default DialogAddEditCategory