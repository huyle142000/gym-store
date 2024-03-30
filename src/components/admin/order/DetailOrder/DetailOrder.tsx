import React, { useCallback, useRef, useState } from 'react'
import useDetailOrder from './useDetailOrder'

import { Box, Button, DialogActions, DialogContent, Grid, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import { styled } from '@mui/system'


import dayjs from 'dayjs'
import { approvalOrders, putAdminNoteOrders } from '@/store/app/order';

import { useDispatch } from 'react-redux';
import { AccountCircle } from '@mui/icons-material';
import { AppDispatch } from '@/store';
import NotifyFunction from '@/shared/NotifyFunction';

const ImageStyled: any = styled(`img`)({
  objectFit: 'cover',
  width: '200px',
  height: '100px',
  borderRadius: '12px'
})

type Props = {
  id: any
  setDialog: (value: boolean) => void
  onSearch: () => void

}

const DetailOrder = ({ id, setDialog, onSearch }: Props) => {
  const refChildNotify: any = useRef()

  const {
    renderOptionStatus,
    data,
    valueNoteAdmin,
    setValueNoteAdmin,
    valueStatus,
    setValueStatus
  } = useDetailOrder(id)

  const dispatch = useDispatch<AppDispatch>();




  const handleConfirm = () => {
    let issNotify = true
    let value = valueStatus
    if (data?.status != valueStatus && valueStatus != "new") {
      dispatch(
        approvalOrders({
          id: id,
          status: value,
        })
      )
      issNotify = false
    }

    dispatch(
      putAdminNoteOrders({
        id: id,
        noteOfAdmin: valueNoteAdmin ? valueNoteAdmin : '',
        isNotify: issNotify
      })
    )
    onSearch()
    setDialog(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }

  return (
    <>
      <DialogContent sx={{
        overflowX: { xs: 'auto', lg: 'hidden' },
        width: '800px',
        padding: '16px'
      }}>
        <Box sx={{ marginTop: '16px' }}>
          <Box sx={{
            border: '1px solid #EDEDF2', borderRadius: '12px',
            padding: '16px'
          }}>
            <Grid container justifyContent='flex-start'>
              <Grid item xs={12} sm={6} >
                <Typography sx={{ color: 'text.eightth', fontWeight: '600', fontSize: '16px', marginBottom: "16px" }}>
                  Order infomation
                </Typography>
                <Stack direction='row' alignItems='center' spacing={2} marginBottom="12px">
                  <Typography sx={{ color: 'text.third', fontWeight: '400', fontSize: '16px' }}>
                    Code order:
                  </Typography>
                  <Typography sx={{ color: 'text.third', fontWeight: '600', fontSize: '16px' }}>
                    {data?.orderCode}
                  </Typography>
                </Stack>
                <Stack direction='row' alignItems='center' spacing={2} marginBottom="12px">
                  <Typography sx={{ color: 'text.third', fontWeight: '400', fontSize: '16px' }}>
                    Receipt time:
                  </Typography>
                  <Typography sx={{ color: 'text.third', fontWeight: '600', fontSize: '16px' }}>
                    {dayjs(data?.createdAt).locale('vi').format('hh:mma - DD/MM/YYYY')}
                  </Typography>
                </Stack>
                <Stack direction='row' alignItems='center' spacing={2} >
                  <Typography sx={{ color: 'text.third', fontWeight: '400', fontSize: '16px', flex: '0.3' }}>
                    Order status:
                  </Typography>
                  <Box sx={{ flex: '0.6' }}>
                    <Select sx={{ color: 'text.third', fontWeight: '600', fontSize: '16px' }}
                      fullWidth
                      value={valueStatus}
                      onChange={(e) => {
                        setValueStatus(e.target.value)
                      }}>
                      {renderOptionStatus()}
                    </Select>
                  </Box>
                </Stack>

              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography sx={{ color: 'text.eightth', fontWeight: '600', fontSize: '16px', marginBottom: "16px" }}>
                  Customer infomation
                </Typography>
                <Stack direction='row' alignItems='center' spacing={2} marginBottom="12px">
                  <Typography sx={{ color: 'text.third', fontWeight: '400', fontSize: '16px' }}>
                    Customer’s name:
                  </Typography>
                  <Typography sx={{ color: 'text.third', fontWeight: '600', fontSize: '16px' }}>
                    {data?.customerName ? data?.customerName : 'N/A'}
                  </Typography>
                </Stack>
                <Stack direction='row' alignItems='center' spacing={2} marginBottom="12px">
                  <Typography sx={{ color: 'text.third', fontWeight: '400', fontSize: '16px' }}>
                    Phone number:
                  </Typography>
                  <Typography sx={{ color: 'text.third', fontWeight: '600', fontSize: '16px' }}>
                    {data?.phone ? data?.phone : 'N/A'}
                  </Typography>
                </Stack>
                <Stack direction='row' alignItems='center' spacing={2} marginBottom="12px">
                  <Typography sx={{ color: 'text.third', fontWeight: '400', fontSize: '16px' }}>
                    Email:
                  </Typography>
                  <Typography sx={{ color: 'text.third', fontWeight: '600', fontSize: '16px' }}>
                    {data?.email ? data?.email : 'N/A'}
                  </Typography>
                </Stack>
                <Stack direction='row' alignItems='center' spacing={2} >
                  <Typography sx={{ color: 'text.third', fontWeight: '400', fontSize: '16px' }}>
                    Note:
                  </Typography>
                  <Typography sx={{ color: 'text.third', fontWeight: '600', fontSize: '16px' }}>
                    {data?.note ? data?.note : 'N/A'}
                  </Typography>
                </Stack>

              </Grid>
            </Grid>
          </Box>
          <Box sx={{
            border: '1px solid #EDEDF2', borderRadius: '12px',
            padding: '16px',
            marginTop: '16px'
          }}>
            <Typography sx={{ color: 'text.eightth', fontWeight: '600', fontSize: '16px', marginBottom: "16px" }}>
              List of items in the order
            </Typography>
            <Grid container justifyContent='flex-start' spacing={6}>
              {data?.foods.map((food: any, index: number) => {
                return <Grid item xs={12} key={index} >
                  <Grid container justifyContent='flex-start'>
                    <Grid item xs={4}>
                      {/* {food?.imgFood ?
                        <ImageStyled src={`${API_URL}/${food?.imgFood}`} crossOrigin='anonymous' />
                        : <ImageStyled src={`/images/misc/image-frame.png`} />} */}
                    </Grid>
                    <Grid item xs={8}>
                      <Typography sx={{ color: 'text.third', fontWeight: '700', fontSize: '20px', marginBottom: '26px' }}>
                        {food?.nameFood ? food?.nameFood : "N/A"}
                      </Typography>
                      <Stack direction='row' alignItems='center' spacing={8} marginBottom="12px">
                        <Stack direction='row' alignItems='center' spacing={2}>
                          <Typography sx={{ color: 'text.third', fontWeight: '400', fontSize: '16px' }}>
                            Price:
                          </Typography>
                          <Typography sx={{ color: 'text.third', fontWeight: '600', fontSize: '16px' }}>
                            {food?.price ? `${food?.price}kr` : 'N/A'}
                          </Typography>
                        </Stack>
                        <Stack direction='row' alignItems='center' spacing={2}>
                          <Typography sx={{ color: 'text.third', fontWeight: '400', fontSize: '16px' }}>
                            Quantity:
                          </Typography>
                          <Typography sx={{ color: 'text.third', fontWeight: '600', fontSize: '16px' }}>
                            {food?.quantity ? food?.quantity : 'N/A'}
                          </Typography>
                        </Stack>
                        <Stack direction='row' alignItems='center' spacing={2}>
                          <Typography sx={{ color: 'text.third', fontWeight: '400', fontSize: '16px' }}>
                            Amount:
                          </Typography>
                          <Typography sx={{ color: 'text.eightth', fontWeight: '600', fontSize: '16px' }}>
                            {food?.totalPrice ? `${food?.totalPrice} Kr` : 'N/A'}
                          </Typography>
                        </Stack>
                      </Stack>
                      <Stack direction='row' alignItems='center' spacing={2}>
                        <Typography sx={{ color: 'text.third', fontWeight: '400', fontSize: '16px' }}>
                          Note:
                        </Typography>
                        <Typography sx={{ color: 'text.third', fontWeight: '600', fontSize: '16px' }}>
                          {food?.note ? food?.note : 'N/A'}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
              })}

            </Grid>
          </Box>
          <Box sx={{
            border: '1px solid #EDEDF2', borderRadius: '12px',
            marginTop: '16px',
            padding: '16px'

          }}>
            <Typography sx={{ color: 'text.eightth', fontWeight: '600', fontSize: '16px' }}>
              Note of Admin
            </Typography>
            <TextField
              fullWidth
              variant="standard"
              sx={{
                "& .MuiInputBase-root": {
                  border: "none!important",
                  boxShadow: 'none!important'
                },
              }}
              InputProps={{
                disableUnderline: true, // <== added this
              }}
              value={valueNoteAdmin}
              onChange={(e) => { setValueNoteAdmin(e.target.value) }}
              multiline
              rows={4}
            />
          </Box>
        </Box >
      </DialogContent >
      <DialogActions sx={{ justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
        <Button
          startIcon={<DoneAllOutlinedIcon />} onClick={() => {
            if (refChildNotify) {
              refChildNotify?.current?.handleOpenNotify()
            }
          }} size='large' type='submit' variant='contained' sx={{ mr: 3, textTransform: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: '500' }}>
          Confirm
        </Button>
      </DialogActions>
      {id && <NotifyFunction
        refChild={refChildNotify}
        typeNotify={"confirm"}
        handleConfirm={handleConfirm}
        nameOfObject="order"
      />}
    </>
  )
}

export default DetailOrder