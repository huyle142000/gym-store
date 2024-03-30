import { Box, MenuItem, Select, Stack, Typography } from '@mui/material';
import { DataGrid, viVN } from '@mui/x-data-grid';
import React, { useEffect, useRef, useState } from 'react'

type Props = {
    columns: any
    storeArr: any
}

const DataGridComponent = ({
    columns,
    storeArr,
}: Props) => {
    const [selectWidthSizePage, setSelectWidthSizePage] = useState(0);
    const selectRefPageSize: any = useRef(null);
    useEffect(() => {
        const handleResize = () => {
            if (selectRefPageSize.current) {
                const width = selectRefPageSize.current.offsetWidth;
                setSelectWidthSizePage(width);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Size Page
    const [pageSize, setPageSize] = useState(10)

    const renderSelectSizePage = () => {
        return <Stack direction="row" alignItems='center' spacing={2} sx={{ height: '100%' }}>
            <Typography>
                Xem
            </Typography>
            <Box sx={{ width: '80px' }} >
                <Select
                    fullWidth
                    id='oganization-id'
                    ref={selectRefPageSize}
                    sx={{
                        '& .MuiSelect-outlined.MuiOutlinedInput-input.MuiInputBase-input.MuiSelect-select': {
                            width: '100%',
                            minWidth: 'unset!important',
                            padding: '12.5px 14px!important',
                        },
                        '.MuiOutlinedInput-notchedOutline': {
                            borderColor: '#636366',
                        },

                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#636366!important',
                        }


                    }}
                    labelId='oganization-id'
                    value={pageSize}
                    onChange={(e: any) => {
                        setPageSize(e.target.value)
                    }}
                    inputProps={{ placeholder: 'Trạng thái' }}
                    MenuProps={{
                        PaperProps: {
                            style: {
                                width: selectWidthSizePage,
                                maxWidth: 'none',
                                overflow: 'auto',
                                maxHeight: '200px', // Thay đổi giá trị theo yêu cầu của bạn
                            },
                        },
                    }}

                >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                </Select>

            </Box>
            <Typography>
                mục
            </Typography>
        </Stack>
    }

    const renderDataGrid = () => {
        return <Box sx={{
            padding: '0 16px!important', background: '#fff',
            height: '560px',
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#949499!important'
            },

            '&::-moz-scrollbar-thumb': {
                backgroundColor: '#949499!important'
            },
        }}>
            <DataGrid
                sortingMode='client'
                rows={storeArr ? storeArr : []}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                getRowId={(row: any) => row._id}
                disableRowSelectionOnClick
                disableColumnMenu
                pageSizeOptions={[5, 10, 25]}
                sx={{
                    '& .MuiDataGrid-columnHeaders': { backgroundColor: '#F5F5F7', borderRadius: 0 },
                    '& .MuiDataGrid-horizontalScroll': { height: '5px' },
                    '& .MuiDataGrid-row': { minHeight: '50px!important', maxHeight: 'fit-content!important' },
                    '& .MuiDataGrid-cell': { minHeight: '50px!important', maxHeight: 'fit-content!important' },
                    '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb': {
                        backgroundColor: '#949499!important',
                        borderRadius: '0!important'
                    },

                    // Tùy chỉnh thanh cuộn trên trình duyệt Firefox
                    '& .MuiDataGrid-virtualScroller::-moz-scrollbar-thumb': {
                        backgroundColor: '#949499!important',
                        borderRadius: '0!important'
                    },
                }}
            />
        </Box>

    }

    return {
        renderDataGrid,
        renderSelectSizePage
    }
}

export default DataGridComponent