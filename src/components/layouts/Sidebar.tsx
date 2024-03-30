'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/service';
import Skeleton from 'react-loading-skeleton';
import { Categories } from '@/types/categories';
import { RequestProcessor } from '@/services/requestProcessor';
import { getCategory } from '@/store/app/category';

const drawerWidth = 240;

const fetchCategories = async () => {
    let results: Categories[] | null = null
    await api.get('/categories').then(async (res) => results = await res.data).catch((err) => console.log(err))

    return results;
};

type Props = {
    children: React.ReactNode
}

type PropsAPI = {
    data: Categories[] | undefined | null,
    isLoading: boolean,
    error: any
}

const items = [
    {
        id: 1,
        name: "A",
        children: [
            {
                id: 2,
                parentId: 1,
                name: "A1",
                children: [
                    {
                        id: 3,
                        name: "A11",
                        children: [],
                        parentId: 2,
                    },
                    {
                        id: 4,
                        name: "A12",
                        children: [],
                        parentId: 2
                    }
                ]
            },
            {
                id: 5,
                name: "A2",
                children: []
            }
        ]
    },
    {
        id: 10,
        name: "B",
        children: [
            {
                id: 11,
                name: "B1",
                parentId: 10,
                children: [
                    {
                        id: 12,
                        name: "B11",
                        parentId: 11
                    },
                    {
                        id: 13,
                        name: "B12",
                        parentId: 11,
                        children: []
                    }
                ]
            },
            {
                id: 15,
                name: "B2",
                parentId: 10,
                children: []
            }
        ]
    }
];


const ListItemCategory = ({ item }: any) => {
    let children = null
    if (item?.children && item?.children?.length > 0) {
        children = <List className={`category-item-${item?.id}`} sx={{ display: 'none', position: 'absolute', right: '0', transform: 'translateX(100%)', width: '200px', background: '' }}>
            {item?.children?.map((it: any) => (
                <React.Fragment key={it?.id}>
                    <ListItemCategory item={it} />
                </React.Fragment>
            ))}
        </List>
    }


    return <ListItem disablePadding className={`category-item-button-${item?.id}`}
        sx={{
            "&:hover > ul": {
                display: 'block',
            },
            position: children != null ? 'relative' : ''
        }}
    >
        <ListItemButton
        >
            <ListItemText primary={item?.name} />
        </ListItemButton>
        {children}
    </ListItem >
}




export default function SideBar({
    children
}: Props) {

    const { useQueryWrapper } = RequestProcessor();

    const { data: categoryList, isLoading }: any = useQueryWrapper<Categories[]>(
        'category',
        async () => await getCategory({})
    );
    if (isLoading) {
        // Hiển thị Skeleton trong khi dữ liệu đang được tải
        return (
            <div>
                <Skeleton count={10} height={100} />
            </div>
        );
    }

    const drawer = (
        <div>
            <Toolbar >
                <Typography sx={{ fontSize: '18px', fontWeight: 700 }}>Category</Typography>
            </Toolbar>
            <Divider />
            {items?.length > 0 && items?.map((item, index) => (
                <React.Fragment key={item.id}>
                    <List className={`category-list-${item.id}`} sx={{}}>
                        <ListItemCategory item={item} />
                    </List>
                </React.Fragment>
            ))}

        </div>
    );

    // Remove this const when copying and pasting into your project.

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

                {drawer}
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                {children}
            </Box>
        </Box>
    );
}