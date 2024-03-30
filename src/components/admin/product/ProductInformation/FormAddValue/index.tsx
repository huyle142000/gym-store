import { Button, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type Props = {
    name: any;
    control: any;
    errors: any;
    setValue: any;
    getValues: any;
    register: any;
    watch: any
    setError: any
    clearErrors: any
};

const FormAddValue = ({ name, control, errors, getValues, setValue, register, watch, setError, clearErrors }: Props) => {

    const { fields, append, remove } = useFieldArray({
        control,
        name: `${name}.children`,
    });

    const handleRemoveItem = (index) => {
        remove(index);
    };

    const handleAddChild = () => {
        append('')
    };

    // console.log(fields, "fields")
    const watchChildValues = watch(`${name}.children`, []);
    useEffect(() => {
        const arrClone: string[] = []
        watchChildValues?.forEach((val: any) => {
            if (val?.value) {
                arrClone.push(val?.value)
            }
        })
        watchChildValues.forEach((value: any, index: number) => {
            // Check if the index of the current value is not equal to the current index
            const isDuplicate = arrClone.filter((val, i) => i != index).includes(value.value)
            // Set error if a duplicate is found, otherwise clear the error
            if (isDuplicate && arrClone?.length > 0 && value.value) {
                setError(`${name}.children.${index}`, {
                    type: 'manual',
                    message: 'Value must be unique',
                });
            } else {
                clearErrors(`${name}.children.${index}`);
            }
        });

    }, [JSON.stringify(watchChildValues), setError]);

    return (
        <>
            <div>
                <Controller
                    name={`${name}.value`}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <>
                            <TextField label="Classify1 Value" {...field} />
                            {field?.message && (
                                <Typography variant="caption" color="error">
                                    {field?.message}
                                </Typography>
                            )}
                        </>
                    )}
                />
            </div>
            <Grid container spacing={6} marginTop={"2px"}>

                {fields.map((item, index) => (
                    <Grid item xs={6} key={item?.id}>
                        <Controller
                            name={`${name}.children.${index}.value`}
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <>
                                    <TextField label={`Child ${index + 1}`} {...field} />
                                    {errors?.[`${name}`]?.children[index]?.message && (
                                        <Typography variant="caption" color="error">
                                            {errors?.[`${name}`]?.children[index]?.message}
                                        </Typography>
                                    )}
                                    <Button type="button" onClick={() => handleRemoveItem(index)}>
                                        Remove
                                    </Button>
                                </>
                            )}
                        />
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <Button type="button" onClick={handleAddChild}>
                        Add Child
                    </Button>
                </Grid>
            </Grid>

        </>
    );
};

export default FormAddValue;
