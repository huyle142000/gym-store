// ** MUI Imports

import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

// ** Third Party Imports
import { Controller } from 'react-hook-form'

// ** Icons Imports
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'

import useAddEditChildSubCategory from './useAddEditChildSubCategory'
import Description from '@/shared/Description'
import { TextField } from '@mui/material'

const AddEditChildSubCategory = (props: any) => {


    const {
        handleSubmit,
        onSubmit,
        control,
        errors,
    } = useAddEditChildSubCategory(props)

    return (
        <Box>
            <Box sx={{ p: 5 }}>
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <Controller
                                    name='name'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange } }: any) => (
                                        <TextField
                                            value={value}
                                            label={
                                                <span color='rgba(76, 78, 100, 0.68)'>
                                                    Child sub category name<span className='color_red'> *</span>
                                                </span>
                                            }
                                            onChange={onChange}
                                            placeholder='Enter name...'
                                            error={Boolean(errors.name)}
                                        />
                                    )} />
                                {errors.name && <FormHelperText sx={{ color: 'error.main', fontStyle: 'italic' }}>{!!errors.name.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <Controller
                                    name='description'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange } }: any) => (
                                        <Description label='Description' valueController={value} onChange={onChange} placeholder='(Limit 300)' error={Boolean(errors.description)} />
                                    )} />
                                {errors.description && <FormHelperText sx={{ color: 'error.main', fontStyle: 'italic' }}>{errors.description?.message?.toString()}</FormHelperText>}
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

export default AddEditChildSubCategory

