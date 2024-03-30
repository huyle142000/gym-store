import { Box, Button, FormControl, FormHelperText, Grid, TextField } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'
import useAddEditUser from './useAddEditUser'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'

type Props = {
    id: string,
    onCloseDrawer: () => void
}

const AddEditUser = ({ id, onCloseDrawer }: Props) => {
    const {
        handleSubmit,
        control,
        errors,
        onSubmit,
        getValues
    } = useAddEditUser(id, onCloseDrawer)

    return (
        <Box sx={{ p: 5 }}>

            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <Controller
                                name='name'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }: any) => (
                                    <TextField
                                        fullWidth
                                        value={value}
                                        label={
                                            <span color='#636366'>
                                                Customer’s name <span className='color_red'>*</span>
                                            </span>
                                        }
                                        onChange={onChange}
                                        placeholder='Enter customer’s name...'
                                        error={Boolean(errors.name)} />

                                )} />
                            {errors.name && <FormHelperText sx={{ fontStyle: 'italic', color: 'error.main' }}>{errors.name.message}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <Controller
                                name='phone'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }: any) => (
                                    <TextField
                                        fullWidth
                                        value={value}
                                        label={
                                            <span color='#636366'>
                                                Phone number <span className='color_red'>*</span>
                                            </span>
                                        }
                                        onChange={onChange}
                                        placeholder='Enter phone...'
                                        error={Boolean(errors.phone)} />

                                )} />
                            {errors.phone && <FormHelperText sx={{ fontStyle: 'italic', color: 'error.main' }}>{errors.phone.message}</FormHelperText>}
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
                    <Button
                        startIcon={<SaveOutlinedIcon />}
                        size='large'
                        type='submit'
                        variant='contained'
                        sx={{ textTransform: 'unset' }}>
                        Save
                    </Button>

                </Box>
            </form>
        </Box>
    )
}

export default AddEditUser