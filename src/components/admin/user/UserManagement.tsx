// ** React Imports
import { useState, useEffect, useCallback, useRef } from 'react'


// ** Next Import

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Drawer from '@mui/material/Drawer';

// ** Icons Imports
import CloseIcon from '@mui/icons-material/Close';

import SearchIcon from '@mui/icons-material/Search';

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '@/store'

// @ts-ignore
import { InputAdornment, OutlinedInput } from '@mui/material'

// 
const IconStyled: any = styled("img")({
  cursor: 'pointer'
})


import {
  getUsers, getUserSearch, deleteUser
} from '@/store/app/user'
import NotifyFunction from '@/shared/NotifyFunction'
import DataGridComponent from '@/shared/DataGridComponent'
import AddEditUser from './AddEditUser/AddEditUser'




const UserManagement = () => {
  const storeUser = useSelector((state: RootState) => state.userSlice);
  const dispatch = useDispatch<AppDispatch>();

  const handleDrawerClose = () => {
    setDrawer(false)
    dispatch(
      getUsers()
    )

  }

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
  const [selectedId, setSelectedId] = useState<any>(null)

  const [search, setSearch] = useState<string>('')
  const [status, setStatus] = useState<string>('all')

  // PageDataGrid
  const [pageSize, setPageSize] = useState<number>(10)

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

  // NotifyPopup
  const [openNotify, setOpenNotify] = useState<boolean>(false)

  const handleOpenNotify = useCallback(() => setOpenNotify(true), [])

  const handleCloseNotify = useCallback(() => setOpenNotify(false), [])

  const handleConfirm = useCallback(() => {
    dispatch(deleteUser({ id: selectedId }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId])

  // refChildNotify
  const refChildNotify: any = useRef()
  const [nameTitle, setNameTitle] = useState<string>("")

  const RowOptions: any = ({ id }: { id: number | string }) => {

    return (
      <Stack direction="row" alignItems="center" >

        <IconButton size="small" onClick={() => {
          setSelectedId(id)
          handleDrawerOpen()
        }}>
          <IconStyled src="/images/basic/edit-icon.svg" sx={{ cursor: 'pointer', color: 'grey.iconBtn' }} />
        </IconButton>
        <IconButton size="small" onClick={() => {
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
      minWidth: 100,
      field: '_id',
      headerName: '#',
      renderCell: (row: any) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              color='primary'
              sx={{ textDecoration: 'none', fontSize: '14px' }}
            >#{row.api.getRowIndex(row.row._id) + 1}</Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.16,
      minWidth: 230,
      field: 'name',
      headerName: "customer's name",
      renderCell: ({ row }: any) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                sx={{ color: 'text.fifth', fontSize: '14px', fontWeight: '500', textDecoration: 'none' }}>
                {row.name ? row.name : "N/A"}
              </Typography>
            </Box>
          </Box>
        )
      }
    },

    {
      flex: 0.11,
      minWidth: 200,
      headerName: 'phone number',
      field: 'phone',
      renderCell: ({ row }: any) => {
        return (
          <Typography noWrap sx={{ color: 'text.third', fontWeight: '500', fontSize: '14px' }}>
            {row?.phone ? row.phone : "N/A"}
          </Typography>
        )
      }
    },

    {
      flex: 0.16,
      minWidth: 250,
      field: 'email',
      headerName: 'email',
      renderCell: ({ row }: any) => {
        return (
          <Typography noWrap sx={{ color: 'text.third', fontWeight: '500', fontSize: '14px' }}>
            {row.email ? row.email : "N/A"}
          </Typography>
        )
      }
    },
    {
      flex: 0.05,
      field: 'totalOrdersPlaced',
      minWidth: 180,
      headerName: 'total orders placed',
      renderCell: ({ row }: any) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography noWrap sx={{ color: 'text.third', fontWeight: '500', fontSize: '14px' }}>
              {row?.totalOrdersPlaced ? row?.totalOrdersPlaced : "0"}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.05,
      field: 'totalOrdersValue',
      minWidth: 180,
      headerName: 'Total order value',
      renderCell: ({ row }: any) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography noWrap sx={{ color: 'text.third', fontWeight: '500', fontSize: '14px' }}>
              {row?.totalOrdersValue ? row?.totalOrdersValue : "0"}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.07,
      minWidth: 110,
      field: 'subscribed',
      headerName: 'Subscribed',
      renderCell: ({ row }: any) => {
        return (
          <Typography sx={{ fontWeight: '500', color: row?.subscribed == true ? "#10C900" : '#F04438' }}>
            {row?.subscribed == true ? "True" : 'False'}
          </Typography>
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
        <RowOptions id={row._id} />
      </Box>
    }
  ]



  const onSearch = useCallback(() => {
    let checkSearchValue
    if (search.includes('@')) {
      checkSearchValue = `"${(search)}"`
    } else {
      checkSearchValue = (search)
    }
    dispatch(getUserSearch({
      search: checkSearchValue,
      status: status == 'all' ? '' : status
    }))
  }, [status, search])


  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      // Thực hiện hành động tại đây khi nhấn phím Enter
      onSearch();
    }
  };

  const { renderDataGrid } = DataGridComponent({
    columns: columns,
    storeArr: storeUser?.data,
  })

  return (
    <Box>
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
                      onBlur={e => setSearch(e.target.value)}
                      onChange={(e) => {
                        setSearch(e.target.value)
                      }}
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
                    <InputLabel id='status-select'>Subscribed</InputLabel>
                    <Select
                      fullWidth
                      defaultValue='all'
                      value={status}
                      id='select-status'
                      label='Subscribed '
                      labelId='status-select'
                      onChange={e => {
                        setStatus(e.target.value)
                        dispatch(
                          getUserSearch({
                            search: search,
                            status: e.target.value == 'all' ? '' : e.target.value,
                          })
                        )
                      }}
                      inputProps={{ placeholder: 'Subscribed' }}>
                      <MenuItem value='all'>All</MenuItem>
                      <MenuItem value='true'>Subscribed</MenuItem>
                      <MenuItem value='false'>Unsubscribed</MenuItem>
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
                User list
              </Typography>

            </Stack>
            <Box>
              {renderDataGrid()}
            </Box>
          </Box>
        </Grid>
        {drawer && <Drawer
          anchor="right"
          open={drawer}
          variant="temporary"
          onClose={() => { handleDrawerClose() }}
          ModalProps={{ keepMounted: true }}
          sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', md: 500 } } }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 5, pb: 0 }}>
            <Typography variant='h6' color="primary">{selectedId !== null ? 'Edit customer' : 'Add customer'}</Typography>
            <IconButton onClick={() => { handleDrawerClose() }}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Box id="drawer-content" sx={{ maxHeight: '100%', overflowY: 'auto' }}>
            <AddEditUser onCloseDrawer={() => { handleDrawerClose() }} id={selectedId} />
          </Box>
        </Drawer>}

        {/* PopUpDetele */}
        {openNotify && <NotifyFunction
          refChild={refChildNotify}
          typeNotify={"delete"}
          handleConfirm={handleConfirm}
          nameOfObject={"customer"}
        />}
      </Grid >

    </Box>
  )
}
export default UserManagement
