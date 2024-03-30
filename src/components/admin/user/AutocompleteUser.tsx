import React, { Ref, memo, useCallback, useEffect, useImperativeHandle, useState } from 'react'
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Grid, OutlinedTextFieldProps, Paper, Stack, TextField, Typography, } from '@mui/material'
import { styled } from '@mui/material/styles'
import { User } from '@/types/user';
import { getUsers } from '@/store/app/user';
import { RequestProcessor } from '@/services/requestProcessor';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
type Props = {
    refChild?: Ref<any>
    isFilter: boolean
    showError?: boolean
    disabled?: boolean
    title?: any
    onChange: (e: any) => void
    common: any
}

const ImageStyled: any = styled(`img`)({
    objectFit: 'contain'
})

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },

];

const AutocompleteUser = ({ refChild, isFilter, onChange, showError, title, common }: Props) => {
    const { useQueryWrapper } = RequestProcessor();

    // Query to get a list of products
    const { data: userList }: any = useQueryWrapper<User[]>(
        'user',
        getUsers
    );

    const [inputValue, setInputValue] = useState('')
    useImperativeHandle(refChild, () => ({
        setInputValue
    }))


    const _filterOptions = createFilterOptions({
        matchFrom: 'any',
        stringify: (option: any) => option.name + option.phone,
    });

    const filterOptions = (options: any, state: any) => {
        console.log(options, "options")
        console.log(state, "state")

        const results = _filterOptions(options, state);
        if (!results.includes('all') && results?.length >= 1) {
            results.unshift('all');
        }
        if (!results.includes('all') && results?.length == 0) {
            results.unshift('all');
            results.push('notFound');

        }

        return results;
    };


    return (
        <Box >
            <Autocomplete
                fullWidth
                id="oganization-id"
                sx={{
                    '& MuiAutocomplete-poper li': {
                        borderBottom: '1px solid #EDEDF2',
                    },
                    '& MuiAutocomplete-poper li:last-child': {
                        borderBottom: 'none',
                    },
                    maxHeight: '100px',
                    '& .MuiAutocomplete-endAdornment .MuiSvgIcon-root': {
                        color: '#636366'
                    },

                }}
                clearIcon={false}
                inputValue={
                    inputValue ? inputValue : ''
                }

                onInputChange={(event, newInputValue: any) => {
                    if (event) {
                        if (newInputValue == 'undefined') {
                            onChange("")
                        } else {
                            setInputValue(newInputValue)
                        }
                    }
                }}
                onChange={(event, newInputValue: any) => {
                    if (newInputValue == 'all' || !newInputValue) {
                        onChange("")
                    } else {
                        onChange(newInputValue?._id)
                        // if (setNameUser) {
                        //     setNameUser(newInputValue?.name)
                        // }
                    }

                }}
                
                renderInput={(params) => <TextField {...params} label="Custom filter" />}

                filterOptions={filterOptions}
                isOptionEqualToValue={(option: any, value) => {
                    if (option == 'notFound') {
                        onChange("")

                        return false
                    }

                    return option?.name === value?.name
                }}
                options={userList?.length > 0 ? userList : []}
                getOptionLabel={(option: any) => `${option?.name}`}
                renderOption={(props, option: any) => {
                    const optionKey = option._id;
                    if (option == "notFound") {
                        return (
                            <li {...props} style={{ color: '#9F001D', fontSize: '14px', pointerEvents: 'none', background: '#fff!important', textAlign: 'center', padding: '28px 0', display: 'flex', justifyContent: 'center', fontWeight: 600 }} >{common.t(`notFound`)}</li>
                        )
                    }

                    if (option == "all") {

                        return (
                            <li {...props} style={{ color: '#737272', fontSize: '12px', pointerEvents: 'none', background: '#fff!important', paddingTop: '6px', marginTop: '-7px' }} >
                                {common.t(`search_result`)}
                            </li>
                        )
                    }

                    return <li
                        {...props}
                        key={optionKey}

                    >
                        <Stack direction="row" sx={{ width: '100%' }}>
                            <Box sx={{ width: '20%' }}>
                                {option?.image ?
                                    <ImageStyled
                                        src={`http://103.154.176.108:3007/${option?.image}`}
                                        crossOrigin='anonymous'
                                        sx={{ height: '60px', width: '60px', borderRadius: '50%' }}
                                    /> :
                                    <ImageStyled
                                        src="/images/image-default.png"
                                        sx={{ height: '60px', width: '60px', borderRadius: '50%' }}
                                    />
                                }
                            </Box>
                            <Box sx={{ width: '80%' }} >
                                <Typography
                                    sx={{
                                        color: "#3A3A3C", width: '100%', whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        WebkitLineClamp: 1,
                                        WebkitBoxOrient: 'vertical',
                                    }}
                                    fontWeight={500}
                                    fontSize="14px"
                                    noWrap
                                >
                                    {option?.name}
                                </Typography>
                                <Typography
                                    sx={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        WebkitLineClamp: 1,
                                        WebkitBoxOrient: 'vertical',
                                        color: '#747474',
                                        fontSize: '12px'
                                    }}
                                    fontWeight={400}
                                    fontStyle="italic"
                                >
                                    {option?.email}
                                </Typography>
                                <Typography
                                    sx={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        WebkitLineClamp: 1,
                                        WebkitBoxOrient: 'vertical',
                                        color: '#747474',
                                        fontSize: '12px'
                                    }}
                                    fontWeight={400}
                                    fontStyle="italic"
                                >
                                    {option?.phone}
                                </Typography>
                            </Box>
                        </Stack>
                    </li>
                }}
            />
        </Box>
    )

}

export default memo(AutocompleteUser)