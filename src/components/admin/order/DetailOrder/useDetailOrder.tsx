import { api } from '@/services/service'
import { MenuItem } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'


const useDetailOrder = (id: string) => {
    const [data, setData] = useState<any>(null)

    const [valueNoteAdmin, setValueNoteAdmin] = useState<any>("")
    const [valueStatus, setValueStatus] = useState<any>("")
    const getOrderById = () => {
        api.get(`orders/${id}`).then((response: any) => {
            setData(response.data)
            setValueNoteAdmin(response.data.noteOfAdmin)
            setValueStatus(response.data.status)
        }).catch(() => {
            setData(null)
        })
    }

    const renderOptionStatus = useCallback(() => {
        const newOrder = <MenuItem value="new">New order</MenuItem>
        const received = <MenuItem value="received">Order received</MenuItem>
        const canceled = <MenuItem value="canceled">Order canceled</MenuItem>
        const delivered = <MenuItem value="delivered">Order delivered</MenuItem>
        switch (data?.status) {
            case 'new':
                return [newOrder, received, canceled]

            case 'received':
                return [received, canceled, delivered]

            case 'delivered':
                return delivered

            case 'canceled':
                return canceled
            default:
                break;
        }
    }, [data])

    useEffect(() => {
        if (id) {
            getOrderById()
        }
    }, [id])

    return {
        renderOptionStatus,
        data,
        valueNoteAdmin,
        setValueNoteAdmin,
        valueStatus,
        setValueStatus
    }
}

export default useDetailOrder