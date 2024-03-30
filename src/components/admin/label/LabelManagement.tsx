// ** React Imports
import { useState, useEffect, useCallback, useRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { DataGrid, } from '@mui/x-data-grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer';

// ** Icons Imports
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';


// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

import { Avatar, CardContent, CardHeader, Chip, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material'

import { styled } from '@mui/material/styles'
import { AppDispatch, RootState } from '@/store'
import NotifyFunction from '@/shared/NotifyFunction'
import AddEditLabel from './AddEditLabel/AddEditLabel'
import { getLabelSearch, getLabel, deleteLabel } from '@/store/app/label'
import { RequestProcessor } from '@/services/requestProcessor'
import { Label } from '@/types/label'

const IconStyled: any = styled("img")({
    cursor: 'pointer'
})
const ImageStyled: any = styled(`img`)({
    objectFit: 'cover',
    width: '32px',
    height: '32px',
    borderRadius: '50%'
})


const LabelManagement = () => {

    const { useQueryWrapper } = RequestProcessor();
    const { data: labelList }: any = useQueryWrapper<Label[]>(
        'category',
        async () => await getLabel({})
    );



    //** Drawer */
    const [drawer, setDrawer] = useState<boolean>(false)
    const handleDrawerOpen = async () => {
        await scrollToTop()

        setDrawer(true)
    }
    const scrollToTop = () => {
        return new Promise((resolve) => {
            const contentContainer = document.getElementById('drawer-content');
            if (contentContainer) {
                contentContainer.scrollTo({ top: 0, behavior: 'smooth' });
            }
            setTimeout(resolve, 500); // Thời gian chờ để cuộn hoàn tất (tùy chỉnh)
        });
    };

    const [nameTitle, setNameTitle] = useState<string>("")



    // Search
    const [search, setSearch] = useState("")

    // Status
    const [status, setStatus] = useState("all")

    // Label Label
    const [categoryLabel, setLabelLabel] = useState("all")

    // selectID
    const [selectedId, setSelectedId] = useState<any>(null)


    useEffect(() => {
        onSearch()

      
    }, [])


    const handleDeleteID = useCallback(async () => {
        // await dispatch(deleteLabel({ _id: selectedId }))
        onSearch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedId, status, search])

    // Avatar
    const renderClient = (row: any) => {

        if (row?.image) {
            return (
                <></>
                // <ImageStyled src={`${API_URL}/${row?.image}`} sx={{ mr: 3, width: 34, height: 34 }} crossOrigin='anonymous' />
            )
        } else {
            return (
                <Avatar
                    color='primary'
                    sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem', textTransform: 'uppercase' }}>
                    {row?.nameEn ? row?.nameEn : 'Chopchop'}
                </Avatar>
            )
        }
    }

    const handleConfirm = useCallback(() => {
        // dispatch(deleteLabel({ _id: selectedId }))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedId])


    // refChildNotify
    const refChildNotify: any = useRef()

    const RowOptions: any = ({ id, name }: { id: string, name: string }) => {

        return (
            <Stack direction="row" alignItems="center" >

                <IconButton size="small" onClick={() => {
                    setSelectedId(id)
                    handleDrawerOpen()

                }}>
                    <IconStyled src="/images/basic/edit-icon.svg" sx={{ cursor: 'pointer', color: 'grey.iconBtn' }} />
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

    const columns: any = [
        {
            flex: 0.04,
            minWidth: 120,
            field: 'stt',
            align: 'center',
            headerName: 'Ordinal NO.',
            renderCell: (row: any) => {
                console.log(row, "row")
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                            textAlign="center"
                            variant='subtitle2'
                            sx={{ color: 'text.eightth', textDecoration: 'none', fontWeight: '400' }}
                        ># {row.api.getRowIndexRelativeToVisibleRows(row.row._id) + 1}</Typography>
                    </Box>
                )
            }
        },
        {
            flex: 0.15,
            minWidth: 180,
            field: 'name',
            headerName: 'Name of Label ',
            renderCell: ({ row }: any) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        {renderClient(row)}
                        <Box sx={{
                            textDecoration: 'none',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                            maxWidth: 'auto',
                        }}>
                            <Typography noWrap variant='subtitle2' fontWeight='500' sx={{
                                color: 'text.third', whiteSpace: 'nowrap'
                            }}>
                                {row?.name ? row?.name : 'N/A'}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },

        {
            flex: 0.1,
            minWidth: 100,
            field: 'description',
            headerName: 'Mô tả',
            renderCell: ({ row }: any) => {
                return (
                    <Typography noWrap variant='subtitle2' fontWeight='500' sx={{
                        color: 'text.third', whiteSpace: 'nowrap', textOverflow: 'ellipsis', WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical', overflow: 'hidden', maxWidth: 'auto'
                    }}>
                        {row?.description ? row?.description : 'N/A'}
                    </Typography>


                )
            }
        },
        {
            flex: 0.1,
            minWidth: 110,
            sortable: false,
            field: 'actions',
            headerName: 'Thao tác',
            renderCell: ({ row }: any) => <RowOptions id={row._id} name={row.name} />
        }
    ]

    // **________________________________ MAIN FUNCTION ________________________________________


    const onCloseDrawer = async () => {
        onSearch()
        setDrawer(false)
    }


    const onSearch = useCallback(() => {
        // dispatch(getLabelSearch({
        //     search: search,
        //     categoryLabel: categoryLabel == 'all' ? '' : categoryLabel,
        //     status: status == 'all' ? '' : status

        // }))
    }, [search, categoryLabel, status])

    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            // Thực hiện hành động tại đây khi nhấn phím Enter
            onSearch();
        }
    };

    return (
        <Box sx={{ padding: '20px' }}>

            <Grid container spacing={6} sx={{ width: '100%' }}>
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
                                            onChange={(e) => {
                                                setSearch(e.target.value)
                                            }}
                                            onKeyPress={handleKeyPress}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton color="primary" onClick={(e) => {
                                                        onSearch()
                                                    }}>
                                                        <SearchIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item sm={3} xs={12}>
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
                                                // dispatch(getLabelSearch({
                                                //     search: search,
                                                //     categoryLabel: categoryLabel == 'all' ? '' : categoryLabel,
                                                //     status: e.target.value == 'all' ? '' : e.target.value
                                                // }))
                                            }}
                                            inputProps={{ placeholder: 'Status' }}>
                                            <MenuItem value='all'>All</MenuItem>
                                            <MenuItem value='true'>Active</MenuItem>
                                            <MenuItem value='false'>InActive</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box className="white-box" sx={{ border: '1px solid rgba(76, 78, 100, 0.12)', borderRadius: '10px' }}>
                        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" spacing={3} sx={{ p: 6 }}>
                            <Typography variant="h6" color="primary" fontWeight={600}>
                                Label list
                            </Typography>
                            <Button startIcon={<AddIcon />} variant="contained" size="large" onClick={() => {
                                setSelectedId(null)
                                handleDrawerOpen()
                            }} sx={{ textTransform: 'unset' }}>
                                Thêm nhãn
                            </Button>
                        </Stack>
                        <Box sx={{ height: "500px" }}>
                            <DataGrid
                                sortingMode='client'
                                rows={labelList !== undefined ? labelList : []}
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
                {drawer && <Drawer
                    anchor="right"
                    open={drawer}
                    variant="temporary"
                    onClose={() => setDrawer(false)}
                    ModalProps={{ keepMounted: true }}
                    sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', md: "900px" } } }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 5, pb: 0 }}>
                        <Typography variant='h6' sx={{ color: 'text.eightth', fontWeight: '500' }}>{selectedId ? "Edit Label" : "Add new Label"}</Typography>
                        <IconButton onClick={() => { setDrawer(false) }}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                    <Box id="drawer-content" sx={{ maxHeight: '100%', overflowY: 'auto' }}>
                        <AddEditLabel onCloseDrawer={() => onCloseDrawer()} panelId={selectedId} drawer={drawer} storeLabelLabel={labelList} onSearch={onSearch} />
                    </Box>
                </Drawer>}
                {/* PopUpDetele */}
                <NotifyFunction
                    typeNotify={"confirm"}
                    refChild={refChildNotify}
                    handleConfirm={handleConfirm}
                    contentConfirm={
                        <span>
                            Bạn có chắc chắn muốn xoá nhãn <b style={{ color: '#636366', fontWeight: '600' }}>{nameTitle}</b> không?
                        </span >
                    }
                />
            </Grid >
        </Box>
    )
}
export default LabelManagement
