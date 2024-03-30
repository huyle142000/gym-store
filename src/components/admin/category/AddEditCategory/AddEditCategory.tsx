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

import useAddEditCategory from './useAddEditCategory'
import Description from '@/shared/Description'

const AddEditCategory = (props: any) => {


    const {
        handleSubmit,
        onSubmit,
        control,
        errors,
    } = useAddEditCategory(props)

    return (
        <Box>
            <Box sx={{ p: 5 }}>
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <Controller
                                    name='description'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange } }: any) => (
                                        <Description label='Mô tả lĩnh vực' valueController={value} onChange={onChange} placeholder='(Tối đa 300 kí tự)' error={Boolean(errors.description)} />
                                    )} />
                                {errors.description && <FormHelperText sx={{ color: 'error.main', fontStyle: 'italic' }}>{errors.description.message}</FormHelperText>}
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

export default AddEditCategory

