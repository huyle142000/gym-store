/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useLayoutEffect, useState } from 'react'
import {
    Modal, Card, CardContent, Box, Stack, Typography, CardActions, Button,
} from '@mui/material'
import { styled } from '@mui/system'

//ICON 
import toast from 'react-hot-toast';

// Create a styled component
const ImageStyled: any = styled('img')({
    objectFit: 'contain',
});

import WestIcon from '@mui/icons-material/West';


interface TypeProps {
    typeNotify: string
    contentOfNotify: any
    idPopUp: any
    title?: string
}

const ToastNotify = ({ typeNotify = "delete", contentOfNotify, idPopUp, title }: TypeProps) => {
    const [openNotify, setOpenNotify] = useState(true)
    const handleCloseNotify = () => {
        toast.dismiss(idPopUp)
        setOpenNotify(false)
    }

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
                objNotify.iconHeader = <ImageStyled src='/images/icons/basic/icon-success.svg' sx={{ fontSize: { width: "48px", md: "60px" }, height: 'auto' }} />
                objNotify.title = 'Successfully!'
                objNotify.content = contentOfNotify
                break;
            case "failed":
                objNotify.iconHeader = <ImageStyled src='/images/icons/basic/icon-x-circle.svg' sx={{ fontSize: { width: "48px", md: "60px" }, height: 'auto' }} />
                objNotify.title = "Không thành công"
                objNotify.content = contentOfNotify
                break;
            case "changePassword":
                objNotify.iconHeader = <ImageStyled src='/images/icons/basic/icon-success.svg' sx={{ fontSize: { width: "86px", md: "86px" }, height: 'auto' }} />
                objNotify.title = "Đổi mật khẩu thành công"
                objNotify.content = contentOfNotify
                break;

            case "error":
                objNotify.iconHeader = <ImageStyled src='/images/icons/basic/icon-err.svg' sx={{ fontSize: { width: "43px", md: "60px" }, height: 'auto' }} />
                objNotify.title = title
                objNotify.content = contentOfNotify
                break;
            case "confirm":
                objNotify.iconHeader = <ImageStyled src='/images/icons/basic/icon-warning.svg' sx={{ fontSize: { width: "43px", md: "60px" }, height: 'auto' }} />
                objNotify.title = "Xác nhận"
                objNotify.content = contentOfNotify
                break;
            case "warning":
                objNotify.iconHeader = <ImageStyled src='/images/icons/basic/icon-err.svg' sx={{ fontSize: { width: "43px", md: "60px" }, height: 'auto' }} />
                objNotify.title = "Cảnh báo"
                objNotify.content = contentOfNotify
                break;
            default:
                break;
        }

        setNotify(objNotify)
    }

    useLayoutEffect(() => {
        renderTypeNotify()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        let timeoutId: any
        if (typeNotify == "success" || typeNotify == "failed") {
            timeoutId = setTimeout(() => {
                handleCloseNotify()
            }, 2000)
        }

        return () => {
            clearTimeout(timeoutId)
        }
    }, [])


    return <Modal
        open={openNotify}
        onClose={handleCloseNotify}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
    >
        <Card
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                width: '350px',
            }}
        >
            <CardContent sx={{ maxHeight: "400px", overflowY: 'auto', padding: '14px!important' }}>
                <Box textAlign='center' sx={{ backgroundColor: '#fff', padding: 0 }}>
                    <Stack alignItems='center' borderBottom='1px solid #ababab'>
                        {notify?.iconHeader}
                        <Typography variant='subtitle1' fontWeight='600' color="#3A3A3C" fontSize={{ xs: '18px', md: '20px' }} margin='10px 0'>
                            {notify?.title}
                        </Typography>

                    </Stack>
                    <Typography variant='subtitle2' mt={3} fontWeight='400' color="#636366" sx={{ padding: '0 16px' }} >
                        {notify?.content}
                    </Typography>
                </Box>
            </CardContent>
            {
                typeNotify != "success" && typeNotify != "changePassword" && typeNotify != "failed" && <CardActions sx={{ justifyContent: 'center' }}>
                    <Button fullWidth variant='outlined' color='error' sx={{ padding: '10px!important', textTransform: 'none', width: 'fit-content' }} onClick={() => {
                        handleCloseNotify()
                    }}>
                        <Stack direction='row'>
                            <WestIcon />
                            <Typography ml={1} color="#D92D20" fontWeight="500">
                                Back
                            </Typography>
                        </Stack>
                    </Button>
                </CardActions>
            }
            {
                typeNotify == "changePassword" && <CardActions >
                    <Button fullWidth variant='contained' sx={{ padding: '10px!important', fontSize: '14px', margin: '20px 0' }} onClick={() => {
                        handleCloseNotify()
                    }}>
                        Back to login
                    </Button>
                </CardActions>
            }
        </Card>

    </Modal >
}

export default memo(ToastNotify)