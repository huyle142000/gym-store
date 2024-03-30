'use client'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, IconButton, InputBase } from '@mui/material';

const pages = ['Products', 'Pricing', 'Blog'];

type Props = {}
const SearchTerm = ({ }: Props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Handle search submit logic here (e.g., navigate to search results page)
        console.log(`Searching for: ${searchTerm}`);
    };

    return (
        <Box sx={{ mr: 2, width: '100%' }}>
            <form onSubmit={handleSearchSubmit} style={{ position: 'relative' }}>
                <IconButton sx={{ position: 'absolute', display: 'flex', alignItems: 'center', pl: 1, right: '20px', top: '50%', transform: 'translateY(-50%)',cursor:'pointer',zIndex:'10' }}>
                    <SearchIcon />
                </IconButton>
                <InputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchTerm}
                    fullWidth
                    sx={{ borderRadius: '24px', padding: '5px 30px', color: '#000',background:'#fff' }}
                    onChange={handleSearchChange}
                />
            </form>

            <Box sx={{ display: 'flex' }}>
                {pages.map((page) => (
                    <Button
                        key={page}
                        sx={{ color: 'white', display: 'block', fontSize: '14px', textTransform: 'capitalize' }}
                    >
                        {page}
                    </Button>
                ))}
            </Box>
        </Box>
    )
}

export default SearchTerm