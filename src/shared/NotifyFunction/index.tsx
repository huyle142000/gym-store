import React, { memo, useImperativeHandle, useLayoutEffect, useState } from 'react'
import {
    Modal, Card, CardContent, Box, Stack, Typography, Button
} from '@mui/material'
import { styled } from '@mui/system'

//ICON 
import WestIcon from '@mui/icons-material/West';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';

const ImageStyled: any = styled(`img`)({
    objectFit: 'contain'
})


interface typeProps {
    title?: string
    typeNotify: string
    isSetting?: boolean
    handleSetting?: any
    refChild: any
    handleConfirm?: any
    nameOfObject?: string | undefined
    isLock?: boolean
    isConfirm?: boolean
    contentConfirm?: any
    inforUser?: any
}

const NotifyFunction = ({ typeNotify = "confirm", isSetting, handleSetting, refChild, handleConfirm, nameOfObject, isLock, isConfirm, contentConfirm, inforUser, title = "Xóa" }: typeProps) => {
    const [openNotify, setOpenNotify] = useState(false)
    const handleOpenNotify = () => {
        setOpenNotify(true)
    }
    const handleCloseNotify = () => {
        setOpenNotify(false)
    }

    useImperativeHandle(refChild, () => ({
        handleOpenNotify,
        handleCloseNotify
    }));

    // TypeNotify
    const [notify, setNotify] = useState<any>({
        title: '',
        content: '',
        color: '',
        iconHeader: '',
        iconFooter: '',
        iconFooterTitle: '',

    })

    const renderTypeNotify = () => {
        const objNotify: any = {}
        switch (typeNotify) {
            case "success":
                objNotify.iconHeader = <ImageStyled src='/images/icons/basic/icon-success.svg' sx={{ fontSize: { width: "40px", md: "60px" }, height: 'auto' }} />
                objNotify.title = "Thành công"
                objNotify.content = `${nameOfObject} thành công!`
                break;

            case "error":
                objNotify.iconHeader = <ImageStyled src='/images/icons/basic/icon-success.svg' sx={{ fontSize: { width: "40px", md: "60px" }, height: 'auto' }} />
                objNotify.title = "Thất bại"
                objNotify.content = `${nameOfObject} thất bại!`
                break;

            case "confirm":
                objNotify.title = isConfirm ? "Xác nhận" : title ? title : ''
                objNotify.content = contentConfirm ? contentConfirm : `Bạn có muốn xoá ${nameOfObject} không?`
                objNotify.color = "#fff"
                objNotify.iconHeader = <ImageStyled src="/images/icons/basic/icon-question.svg" alt="" sx={{ fontSize: { xs: "40px", md: "50px" }, }} />
                objNotify.iconFooter = <DoneAllOutlinedIcon sx={{ fontSize: "20px" }} />
                objNotify.iconFooterTitle = "Xác nhận"

                break;

            case "warning":
                objNotify.title = 'Cảnh báo'
                objNotify.content = contentConfirm
                objNotify.iconHeader = <ImageStyled src="/images/icons/basic/icon-question.svg" alt="" sx={{ fontSize: { xs: "40px", md: "50px" }, }} />
                objNotify.iconFooter = <DoneAllOutlinedIcon sx={{ fontSize: "20px" }} />
                objNotify.iconFooterTitle = "Xác nhận"

                break;

            case "lock":
                objNotify.title = `${!isLock ? "Khóa tài khoản" : "Mở tài khoản"} ${nameOfObject}`
                objNotify.content = `Bạn có chắc chắn muốn ${!isLock ? "khóa tài khoản" : "mở tài khoản"} ${nameOfObject} này không?`
                objNotify.color = "#fff"
                objNotify.iconHeader = !isLock ? <img src="/images/icons/basic/icons-lock.svg" style={{ width: '30px', height: '40px', objectFit: 'contain' }}
                    alt="" /> : <img src="/images/icons/basic/icon-unlock.svg" style={{ width: '30px', height: '40px', objectFit: 'contain' }}
                        alt="" />
                objNotify.iconFooter = <DoneAllOutlinedIcon sx={{ fontSize: "20px" }} />
                objNotify.iconFooterTitle = `Xác nhận`
                objNotify.inforUser = inforUser

                break;

            default:
                break;
        }

        setNotify(objNotify)
        renderFooterNotify()
    }

    useLayoutEffect(() => {
        if (typeNotify) {
            renderTypeNotify()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [typeNotify, isLock, nameOfObject, contentConfirm, isSetting])

    const renderFooterNotifyDelete = () => {
        return <Stack direction='row' spacing={4} alignItems='center' justifyContent='space-between' mt={5}>
            <Button fullWidth variant='outlined' sx={{ padding: '10px!important', textTransform: 'none' }} onClick={() => {
                handleCloseNotify()
                if (isSetting) {
                    handleSetting()
                }
            }}>
                <Stack direction='row'>
                    <WestIcon />
                    <Typography ml={1} color="#D92D20" fontWeight="500">
                        Quay lại
                    </Typography>
                </Stack>
            </Button>
            <Button fullWidth variant='contained' sx={{ padding: '10px!important', textTransform: 'none' }} color={"error"}

                onClick={() => {
                    handleConfirm()
                    handleCloseNotify()
                }}>
                <Stack direction='row' color={notify?.color} alignItems='center' >
                    {notify?.iconFooter}
                    <Typography ml={2} color={notify?.color} >
                        {notify?.iconFooterTitle}
                    </Typography>
                </Stack>
            </Button>

        </Stack>
    }

    const renderFooterNotify = () => {
        switch (typeNotify) {
            case "confirm":
                return renderFooterNotifyDelete()
                break;
            case "lock":
                return renderFooterNotifyDelete()
                break;
            default:
                break;
        }
    }




    return <Modal
        open={openNotify}
        onClose={() => {
            handleCloseNotify()
            if (isSetting) {
                handleSetting()
            }
        }}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
    >
        <Card
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                width: typeNotify ? '340px' : '375px',
            }}
        >
            <CardContent sx={{ maxHeight: "400px", overflowY: 'auto', padding: '14px!important' }}>
                <Box textAlign='center' sx={{ backgroundColor: '#fff', padding: { xs: "20px", md: "10px 4px" } }}>
                    <Stack alignItems='center' borderBottom='1px solid #ababab'>
                        {notify?.iconHeader}
                        <Typography variant='subtitle1' fontWeight='600' color="#48484A" fontSize={{ xs: '18px', md: '20px' }} margin='10px 0'>
                            {notify?.title}
                        </Typography>

                    </Stack>
                    <Typography variant='subtitle2' mt={3} fontWeight='400' color="#434343" >
                        {notify?.content}
                    </Typography>
                    {typeNotify == "lock" ? inforUser : ''}
                    {["confirm", "lock"].includes(typeNotify) && renderFooterNotify()}
                </Box>
            </CardContent>
        </Card>

    </Modal>
}

export default memo(NotifyFunction)