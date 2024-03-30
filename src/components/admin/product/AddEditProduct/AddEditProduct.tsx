// ** MUI Imports

import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

// ** Third Party Imports
import { Controller } from 'react-hook-form'
import { NumericFormat } from 'react-number-format';

// ** Icons Imports
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'

import useAddEditProduct from './useAddEditProduct'
import Description from '@/shared/Description'
import { Dialog, DialogTitle, Drawer, IconButton, Typography } from '@mui/material'
import { useAppContext } from '@/components/contexts/AppProvider'
import { styled } from '@mui/material/styles';
import CropImage from '../CropImage'

import AddIcon from '@mui/icons-material/Add';

const VisuallyHiddenInput: any = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

import CloseIcon from '@mui/icons-material/Close';
import CategoryManagement from '../../category/CategoryManagement'
import ProductInformation from '../ProductInformation'


const AddEditProduct = ({ id, ...props }: any) => {

    const auth = useAppContext()
    const {
        handleSubmit,
        onSubmit,
        control,
        errors,
        register,
        setValue,
        getValues,
        watch,
        setError,
        clearErrors,
        dialog, setDialog, setDataCategory
    } = useAddEditProduct({ ...props })

    return (
        <Box>
            <Box sx={{ p: 5 }}>
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={6}>
                        <Grid item xs={12} >
                            <Grid container spacing={6}>
                                <Grid item xs={12} >
                                    <Typography sx={{}}>Chọn ảnh</Typography>
                                    <Typography sx={{}}>*Tỉ lệ 1:1</Typography>
                                    <Grid container spacing={3} mt={1}>
                                        <CropImage />
                                    </Grid>

                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl sx={{ width: '100%', mt: 2, mb: 1 }}>
                                        <Controller
                                            name={'name'}
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { onChange, onBlur } }: any) => (
                                                <TextField
                                                    placeholder={"Nhập tên sản phẩm"}
                                                    label={
                                                        <span style={{ display: 'inline' }} className='titleLabel'>
                                                            { }<span className='color_red'> *</span>
                                                        </span>
                                                    }
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    error={Boolean(errors.name)}

                                                />
                                            )} />
                                        {errors.name && <FormHelperText sx={{ color: 'error.main', fontStyle: 'italic', marginLeft: '0' }}>{!!errors.name.message}</FormHelperText>}


                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <Controller
                                            name='price'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { value, onChange } }: any) => (
                                                <NumericFormat
                                                    allowNegative={false}
                                                    label={"Giá"}
                                                    fullWidth
                                                    customInput={TextField}
                                                    onKeyDown={e => ['.'].includes(e.key) && e.preventDefault()}
                                                    onChange={(event: any) => {
                                                        const value = event.target.value
                                                        const newValue = Number(value.replace(/[,./]/g, ''));
                                                        onChange(newValue);
                                                    }}
                                                    value={value}
                                                    error={Boolean(errors.price)}
                                                    inputProps={{
                                                        inputMode: 'numeric',
                                                        step: 'any',

                                                    }}
                                                    sx={{ '& input': { textAlign: 'center' } }}

                                                />
                                            )} />
                                        {errors.price && <FormHelperText sx={{ color: 'error.main', fontStyle: 'italic' }}>{!!errors.price.message}</FormHelperText>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <Controller
                                            name='countInStock'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { value, onChange } }: any) => (
                                                <NumericFormat
                                                    allowNegative={false}
                                                    label={"Hàng tồn kho"}

                                                    fullWidth
                                                    customInput={TextField}
                                                    onKeyDown={e => ['.'].includes(e.key) && e.preventDefault()}
                                                    onChange={(event: any) => {
                                                        const value = event.target.value
                                                        const newValue = Number(value.replace(/[,./]/g, ''));
                                                        onChange(newValue);
                                                    }}
                                                    value={value}
                                                    error={Boolean(errors.countInStock)}
                                                    inputProps={{
                                                        inputMode: 'numeric',
                                                        step: 'any',

                                                    }}
                                                    sx={{ '& input': { textAlign: 'center' } }}

                                                />
                                            )} />
                                        {errors.countInStock && <FormHelperText sx={{ color: 'error.main', fontStyle: 'italic' }}>{!!errors.countInStock.message}</FormHelperText>}
                                    </FormControl>
                                </Grid>

                            </Grid>

                        </Grid>
                        <Grid item xs={12} >


                            <Typography color={'primary'} sx={{ fontSize: '18px', fontWeight: '600', mt: 2, mb: 2 }}>
                                {"Danh mục sản phẩm"}
                            </Typography>
                            <Button startIcon={<AddIcon />} variant="contained" size="large" onClick={() => {
                                setDialog(true)
                            }} sx={{ textTransform: 'unset' }}>
                                Chọn danh mục
                            </Button>

                            <Typography sx={{ fontSize: '15px', fontWeight: '400', mt: 2 }}>
                                Danh mục sản phẩm đã chọn:
                            </Typography>

                            <Dialog
                                open={dialog}
                                maxWidth='md'
                                onClose={() => { setDialog(!dialog) }}
                                aria-labelledby='user-view-edit'

                                sx={{
                                    '& .MuiPaper-root': {
                                        width: { xs: '100%', md: '80%' }
                                    }
                                }}
                            >
                                <DialogTitle id='user-view-edit' sx={{ fontSize: '1.5rem !important', borderBottom: '1px solid #E9E9EC' }}>
                                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                        <Typography variant='h6' fontWeight='600' color='primary'>
                                            Danh mục sản phẩm
                                        </Typography>
                                        <IconButton onClick={() => setDialog(!dialog)}>
                                            <CloseIcon sx={{ color: '#000' }} />
                                        </IconButton>
                                    </Stack>
                                </DialogTitle>

                                <CategoryManagement setValue={setValue} onCloseDrawer={() => setDialog(false)} panelId={id} />

                            </Dialog>

                            {console.log(123123)}
                        </Grid>


                        <Grid item xs={12}>
                            <Typography color={'primary'} sx={{ fontSize: '18px', fontWeight: '600', mt: 2, mb: 2 }}>Tạo phân loại</Typography>
                            <ProductInformation
                                watch={watch}
                                control={control}
                                errors={errors}
                                setError={setError}
                                setValue={setValue}
                                getValues={getValues}
                                register={register}
                                clearErrors={clearErrors}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <Controller
                                    name='description'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange } }: any) => (
                                        <Description label={"Mô tả"} valueController={value} onChange={onChange} placeholder={"Tối đa 200 ký tự"} error={Boolean(errors.description)} />
                                    )} />
                                {errors.description && <FormHelperText sx={{ color: 'error.main', fontStyle: 'italic' }}>{!!errors.description.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mt: 6,
                            mx: 4,
                            mb: 4
                        }}>
                        <Stack direction='row' justifyContent='center' alignItems='center' spacing={6}>
                            <Button
                                startIcon={<SaveOutlinedIcon />}
                                size='large'
                                type='submit'
                                variant='contained'
                                sx={{ textTransform: 'unset' }}>
                                Lưu
                            </Button>
                        </Stack>
                    </Box>
                </form>
            </Box>


            {/* Notify */}

        </Box >
    )
}

export default AddEditProduct

