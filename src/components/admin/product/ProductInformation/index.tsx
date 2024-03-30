import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FormAddValue from './FormAddValue'
import AddIcon from '@mui/icons-material/Add';
import { Controller } from 'react-hook-form';
import CropImage from '../CropImage';
type Props = {
    control: any
    errors: any
    setValue: any
    getValues: any
    register: any
    watch: any
    setError: any
    clearErrors: any
}


const ProductInformation = ({ control, errors, getValues, setValue, register, setError, watch, clearErrors }: Props) => {
    const [activeClassify1, setActiveClassify1] = useState(false)
    const [activeClassify2, setActiveClassify2] = useState(false)
    console.log(getValues("classifyTotal"), "classifyTotal")
    const watchChildValues1 = watch(`classify1.children`, []);
    const watchChildValues2 = watch(`classify2.children`, []);
 
    useEffect(() => {
        const arrClone: any[] = []
        watchChildValues1.forEach((element: any) => {
            arrClone.push({
                ...element, children: watchChildValues2
            })
        });
        setValue('classifyTotal', arrClone)


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(watchChildValues1), JSON.stringify(watchChildValues2)])

    return (
        <Grid container spacing={6}>

            <Grid item xs={12}>
                {!activeClassify1 && <Button startIcon={<AddIcon />} onClick={() => setActiveClassify1(!activeClassify1)}>Thêm phân loại</Button>}
                {activeClassify1 && <FormAddValue
                    name={'classify1'} control={control} errors={errors} getValues={getValues} setValue={setValue} register={register} watch={watch} setError={setError} clearErrors={clearErrors}
                />}
            </Grid>
            <Grid item xs={12}>
                {activeClassify1 && <Button startIcon={<AddIcon />} onClick={() => setActiveClassify2(!activeClassify2)}>Thêm phân loại 2</Button>}

                {activeClassify1 && activeClassify2 && <FormAddValue
                    name={'classify2'} control={control} errors={errors} getValues={getValues} setValue={setValue} register={register} watch={watch} setError={setError} clearErrors={clearErrors}
                />}
            </Grid>
            <Grid item xs={12} sx={{
                '& .MuiGrid-item.grid-item': {
                    textAlign: 'center',
                    padding: '20px 0 '
                }
            }}>

                <Box >
                    <Grid container sx={{
                        padding: '0!important',
                        '& .MuiGrid-item': {
                            border: '1px solid #ababab',
                            borderBottom: 'none'

                        },
                        '& .MuiGrid-item:not(:last-child)': { /* Thêm :not(:last-child) để loại bỏ border cho phần tử cuối cùng */
                            borderRight: 'none',
                        }
                    }}>
                        <Grid item className='grid-item' xs={watch('classify2.children')?.length > 0 ? 3 : 4} >
                            {watch("classify1.value")}
                        </Grid>
                        {getValues('classify2.children')?.length > 0 && <Grid item xs={getValues('classify2.children')?.length > 0 ? 3 : 4} >
                            {getValues("classify2.value")}
                        </Grid>}
                        <Grid item className='grid-item' xs={getValues('classify2.children')?.length > 0 ? 3 : 4}>
                            <Typography>Kho hàng</Typography>
                        </Grid>
                        <Grid item className='grid-item' xs={getValues('classify2.children')?.length > 0 ? 3 : 4}>
                            <Typography>Giá tiền</Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        {getValues("classifyTotal")?.map((item, index) => {

                            return <Grid item xs={12} key={index}
                                sx={{
                                    padding: '0!important',
                                    '& .MuiGrid-item.grid-item': {
                                        border: '1px solid #ababab',
                                        borderTop: index >= 1 ? 'none' : ''
                                    },
                                    '& .MuiGrid-item:not(:last-child)': { /* Thêm :not(:last-child) để loại bỏ border cho phần tử cuối cùng */
                                        borderRight: 'none',
                                    }
                                }}>
                                <Grid container>
                                    <Grid item className='grid-item' xs={item?.children?.length > 0 ? 3 : 4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                        <CropImage idName={index} setValue={setValue} nameValueSet={'classifyTotal.imageList'} />
                                        <Typography>
                                            {item?.value}
                                        </Typography>
                                    </Grid>

                                    {item?.children?.length > 0 && <Grid item xs={4}>
                                        <Stack direction={'column'}>
                                            {item?.children?.map((i: any, j: number) => {
                                                return (
                                                    <Typography key={j}>{i?.value}</Typography>
                                                );
                                            })}
                                        </Stack>
                                    </Grid>
                                    }
                                    {console.log(item?.children, "item?.children")}

                                    <Grid item className='grid-item' xs={item?.children?.length > 0 ? 3 : 4}>
                                        {item?.children?.length <= 0 ? <>
                                            <Controller
                                                name={`classifyTotal.${index}.price`}
                                                control={control}
                                                defaultValue=""
                                                render={({ field }) => (
                                                    <>
                                                        <TextField label={`Child ${index + 1}`} {...field} />
                                                        {/* {classifyTotal[index] && errors?.classifyTotal[index]?.price?.message && (
                                                <Typography variant="caption" color="error">
                                                    {errors?.classifyTotal[index]?.price?.message}
                                                </Typography>
                                            )} */}

                                                    </>
                                                )}
                                            />
                                        </> : <Stack direction={'column'}>
                                            {item?.children?.map((i: any, j: number) => {
                                                return (
                                                    <Controller
                                                        key={j}
                                                        name={`classifyTotal.${index}.price`}
                                                        control={control}
                                                        defaultValue=""
                                                        render={({ field }) => (
                                                            <>
                                                                <TextField label={`Child ${index + 1}`} {...field} />
                                                                {/* {classifyTotal[index] && errors?.classifyTotal[index]?.price?.message && (
                                                <Typography variant="caption" color="error">
                                                    {errors?.classifyTotal[index]?.price?.message}
                                                </Typography>
                                            )} */}

                                                            </>
                                                        )}
                                                    />
                                                );
                                            })}
                                        </Stack>}

                                    </Grid>
                                    <Grid item className='grid-item' xs={item?.children?.length > 0 ? 3 : 4}>
                                        {item?.children?.length <= 0 ? <>
                                            <Controller
                                                name={`classifyTotal.${index}.countInStock`}
                                                control={control}
                                                defaultValue=""
                                                render={({ field }) => (
                                                    <>
                                                        <TextField label={`Child ${index + 1}`} {...field} />
                                                        {/* {classifyTotal[index] && errors?.classifyTotal[index]?.countInStock?.message && (
                                                <Typography variant="caption" color="error">
                                                    {errors?.classifyTotal[index]?.countInStock?.message}
                                                </Typography>
                                            )} */}

                                                    </>
                                                )}
                                            />
                                        </> : <Stack direction={'column'}>
                                            {item?.children?.map((i: any, j: number) => {
                                                return (
                                                    <Controller
                                                        key={j}
                                                        name={`classifyTotal.${index}.countInStock`}
                                                        control={control}
                                                        defaultValue=""
                                                        render={({ field }) => (
                                                            <>
                                                                <TextField label={`Child ${index + 1}`} {...field} />
                                                                {/* {classifyTotal[index] && errors?.classifyTotal[index]?.countInStock?.message && (
                                                <Typography variant="caption" color="error">
                                                    {errors?.classifyTotal[index]?.countInStock?.message}
                                                </Typography>
                                            )} */}

                                                            </>
                                                        )}
                                                    />
                                                );
                                            })}
                                        </Stack>}

                                    </Grid>

                                </Grid>

                            </Grid>
                        })}
                    </Grid>

                </Box>

            </Grid>

        </Grid>

    );
}

export default ProductInformation