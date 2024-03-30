// ** React Imports
import { useState, useEffect, useCallback, useRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'

// ** Icons Imports
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'



// ** Types Imports


// @ts-ignore
import { Chip, Dialog, DialogTitle, InputAdornment, OutlinedInput } from '@mui/material'

// 
import dayjs from 'dayjs';
import { approvalOrders, deleteOrder, getOrder, getOrderOnSearch } from '@/store/app/order';
import { styled } from '@mui/material/styles'
import DetailOrder from './DetailOrder/DetailOrder'
import { AppDispatch, RootState } from '@/store'
import NotifyFunction from '@/shared/NotifyFunction'


const IconStyled: any = styled("img")({
    cursor: 'pointer'
})



const OrderManagement = () => {
    const store = useSelector((state: RootState) => state.orderSlice);
    const dispatch = useDispatch<AppDispatch>();
    const [search, setSearch] = useState<string>('')
    const [status, setStatus] = useState<string>('all')
    const timeIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            setTimeout(() => {
                onSearch();
                if (timeIntervalRef.current) {
                    clearInterval(timeIntervalRef.current);
                }
                timeIntervalRef.current = setInterval(() => {
                    onSearch();
                }, 3000);
            }, 100);
        } else {
            if (timeIntervalRef.current) {
                clearInterval(timeIntervalRef.current);
            }
            timeIntervalRef.current = setInterval(() => {
                onSearch();
            }, 3000);
        }

        return () => {
            if (timeIntervalRef.current) {
                clearInterval(timeIntervalRef.current);
            }
        };
    }, [search, status]);


    //Dialog
    const [dialog, setDialog] = useState<boolean>(false)


    const [selectedId, setSelectedId] = useState<any>(null)



    // refChildNotify
    const refChildNotify: any = useRef()
    const [nameTitle, setNameTitle] = useState<string>("")

    const handleConfirm = useCallback(() => {
        dispatch(deleteOrder({ _id: selectedId }))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedId])


    const RowOptions: any = ({ id, name, statusOrder }: { id: number | string, name: string, statusOrder: string }) => {

        return (
            <Stack direction="row" alignItems="center" >
                <IconButton size='small' onClick={() => {
                    setSelectedId(id)
                    setDialog(true)
                }}>
                    <IconStyled src="/images/basic/watch-icon.svg" sx={{ cursor: 'pointer', color: 'grey.iconBtn' }} />

                </IconButton>
                <IconButton size="small" onClick={() => {
                    setNameTitle(name)
                    setSelectedId(id)
                    if (refChildNotify) {
                        refChildNotify?.current?.handleOpenNotify()
                    }
                }}>
                    <IconStyled src="/images/basic/trash-icon.svg" sx={{ cursor: 'pointer', color: 'grey.iconBtn' }} />
                </IconButton>

            </Stack>
        )
    }

    const columns = [
        {
            flex: 0.06,
            minWidth: 200,
            field: '_id',
            headerName: '#',
            renderCell: ({ row }: any) => {

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                            variant='subtitle2'
                            sx={{ color: 'text.eightth', textDecoration: 'none', fontWeight: '400' }}
                        >#{row?.orderCode}</Typography>
                    </Box>
                )
            }
        },
        {
            flex: 0.05,
            field: 'customerName',
            minWidth: 230,
            headerName: "customer's name",
            renderCell: ({ row }: any) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography noWrap fontSize="14px" sx={{ color: 'text.third', textTransform: 'capitalize' }}>
                            {row?.customerName ? row?.customerName : "N/A"}
                        </Typography>
                    </Box>
                )
            }
        },
        {
            flex: 0.05,
            field: 'phone',
            minWidth: 150,
            headerName: "phone number",
            renderCell: ({ row }: any) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography noWrap fontSize="14px" sx={{ color: 'text.third', textTransform: 'capitalize' }}>
                            {row?.phone ? row?.phone : "N/A"}
                        </Typography>
                    </Box>
                )
            }
        },
        {
            flex: 0.11,
            minWidth: 200,
            headerName: 'Email',
            field: 'email',
            renderCell: ({ row }: any) => {
                return (
                    <Typography noWrap fontSize="14px" color='text.third'>
                        {row?.email ? row?.email : "N/A"}
                    </Typography>
                )
            }
        },
        {
            flex: 0.16,
            minWidth: 230,
            field: 'name',
            headerName: 'receipt time',
            renderCell: ({ row }: any) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography noWrap fontSize="14px" sx={{ color: 'text.third', textTransform: 'capitalize' }}>
                            {dayjs(row?.createdAt).locale('vi').format('hh:mma - DD/MM/YYYY')}
                        </Typography>
                    </Box>
                )
            }
        },

        {
            flex: 0.1,
            minWidth: 170,
            field: 'status',
            headerName: 'status',
            renderCell: ({ row }: any) => {
                let status = ""
                let colorStatus: any = ""
                let bgStatus: any = ""

                switch (row?.status) {
                    case "delivered":
                        status = "Order delivered"
                        colorStatus = "#FDB528"
                        bgStatus = "#FDB5281F"
                        break;
                    case "new":
                        status = "New order"
                        colorStatus = "#386DF5"
                        bgStatus = "#386ef531"
                        break;
                    case "canceled":
                        status = "Canceled"
                        colorStatus = "#F04438"
                        bgStatus = "#F044381F"
                        break;
                    case "received":
                        status = "Order received"
                        colorStatus = "#10C900"
                        bgStatus = "#10C9001F"
                        break;
                    default:
                        status = "N/A"
                        colorStatus = "default"
                        break;
                }

                return (
                    <Chip
                        variant="outlined"
                        size='small'
                        label={status}
                        sx={{
                            border: 'none',
                            color: colorStatus,
                            backgroundColor: bgStatus,
                            borderRadius: '8px!important',
                            height: '24px',
                            '& .MuiChip-label': { padding: '0 8px!important' }
                        }}
                    />
                )
            }
        },
        {
            flex: 0.05,
            minWidth: 120,
            sortable: false,
            field: 'actions',
            headerName: 'operation',
            renderCell: ({ row }: any) => <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <RowOptions id={row._id} statusOrder={row?.fixedStatus} />
            </Box>
        }
    ]


    // **________________________________ MAIN FUNCTION ________________________________________

    const onSearch = useCallback(() => {
        let checkSearchValue
        if (search.includes('@')) {
            checkSearchValue = `"${(search)}"`
        } else {
            checkSearchValue = (search)
        }
        dispatch(getOrderOnSearch({
            searchValue: checkSearchValue,
            status: status == "all" ? '' : status
        }))


    }, [status, search])


    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            // Thực hiện hành động tại đây khi nhấn phím Enter
            onSearch();
        }
    };

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Box className="white-box" sx={{ border: '1px solid rgba(76, 78, 100, 0.12)', borderRadius: '10px' }}>
                    <CardHeader title='Filter' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
                    <CardContent>
                        <Grid container spacing={6}>
                            <Grid item sm xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="search-bar">Find</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        label='Find'
                                        name='search'
                                        autoComplete='off'
                                        placeholder='Find'
                                        onBlur={e => setSearch(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton color="primary" onClick={onSearch}>
                                                    <SearchIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item sm xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id='status-select'>Status</InputLabel>
                                    <Select
                                        fullWidth
                                        defaultValue='all'
                                        value={status}
                                        id='select-status'
                                        label='Status '
                                        labelId='status-select'
                                        onChange={e => {
                                            setStatus(e.target.value)
                                            dispatch(
                                                getOrderOnSearch({
                                                    searchValue: search,
                                                    status: e.target.value == 'all' ? '' : e.target.value,
                                                })
                                            )
                                        }}
                                        inputProps={{ placeholder: 'Status' }}>
                                        <MenuItem value='all'>All</MenuItem>
                                        <MenuItem value='new'>New order</MenuItem>
                                        <MenuItem value='received'>Order received</MenuItem>
                                        <MenuItem value='delivered'>Order delivered</MenuItem>
                                        <MenuItem value='canceled'>Order canceled</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box className="white-box" sx={{ border: '1px solid rgba(76, 78, 100, 0.12)', borderRadius: '10px' }}>
                    <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" sx={{ p: 6 }}>
                        <Typography variant="h6" color="primary" fontWeight={600}>
                            Orders list
                        </Typography>
                    </Stack>
                    <Box sx={{ height: '500px' }}>
                        <DataGrid
                            sortingMode='client'
                            rows={store?.data !== undefined ? store?.data : []}
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
                                '& .MuiDataGrid-columnHeaders': { backgroundColor: '#F5F5F7', borderRadius: 0, textTransform: 'upperCase' },
                                // '.MuiDataGrid-virtualScrollerRenderZone .MuiDataGrid-row': { minHeight: '80px!important', maxHeight: '80px!important' },
                                // '& .MuiDataGrid-cell': { minHeight: '100%!important', maxHeight: '100%!important' }
                            }}
                            autoPageSize
                        />
                    </Box>
                </Box>
            </Grid>
            <Dialog
                open={dialog}
                maxWidth='md'
                onClose={() => { setDialog(!dialog) }}
                aria-labelledby='user-view-edit'
                aria-describedby='user-view-edit-description'>
                <DialogTitle id='user-view-edit' sx={{ fontSize: '1.5rem !important', borderBottom: '1px solid #E9E9EC' }}>
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Typography variant='h6' fontWeight='600' color='primary'>
                            Order details
                        </Typography>
                        <IconButton onClick={() => setDialog(!dialog)}>
                            <CloseIcon sx={{ color: '#000' }} />
                        </IconButton>
                    </Stack>
                </DialogTitle>

                <DetailOrder id={selectedId} setDialog={setDialog} onSearch={onSearch} />


            </Dialog>


            <NotifyFunction
                typeNotify={"confirm"}
                refChild={refChildNotify}
                handleConfirm={handleConfirm}
                contentConfirm={
                    <span>
                        Bạn có chắc chắn muốn xoá lĩnh vực <b style={{ color: '#636366', fontWeight: '600' }}>{nameTitle}</b> không?
                    </span >
                }
            />

        </Grid >
    )
}
export default OrderManagement
