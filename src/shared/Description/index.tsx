import { Box, TextField, Typography } from '@mui/material'
import React from 'react'

type Props = {
    label: any,
    placeholder: string,
    error: boolean,
    valueController: string,
    length?: string | number,
    onChange: (e: any) => void
}

const Description = ({ label, placeholder, error, valueController, length = 300, onChange }: Props) => {
    return (
        <Box position={'relative'} sx={{ width: '100%' }}>
            <TextField
                fullWidth
                multiline
                rows={length == 150 ? 3 : 4}
                value={valueController}
                label={label}
                onChange={onChange}
                placeholder={placeholder}
                error={error}
                sx={{ '& .MuiOutlinedInput-root': { paddingBottom: '35px' } }}
            />
            <Box position={'absolute'} sx={{
                bottom: 0,
                right: 0,
                padding: '5px',
                paddingRight: '15px'

            }}>
                <Typography sx={{ fontStyle: 'italic', color: '#DDDDE5' }}>
                    {valueController?.length ? valueController?.length : 0}/{length}
                </Typography>
            </Box>
        </Box>
    )
}

export default Description