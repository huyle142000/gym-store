'use client'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react'


type Props = {
    children: React.ReactNode
}


// Create a custom theme with the desired color
const theme = createTheme({
    palette: {
        primary: {
            main: '#ee4d2d', // Set the primary color to orange
        },

    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        borderRadius: '24px'
                    },
                },

            },
        },
        MuiSelect: {
            styleOverrides: {
                select: {
                    "& .MuiOutlinedInput-root": {
                        borderRadius: '24px!important'
                    }
                },

            }
        }
    }
})

const ThemeAdmin = ({ children }: Props) => {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>

    )
}

export default ThemeAdmin