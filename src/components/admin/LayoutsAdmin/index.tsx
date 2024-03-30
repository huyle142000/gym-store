'use client'
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ProductManagement from '../product/ProductManagement';
import OrderManagement from '../order/OrderManagement';
import UserManagement from '../user/UserManagement';
import CategoryManagement from '../category/CategoryManagement';
import LabelManagement from '../label/LabelManagement';
// import { useTranslation } from '@/utils/i18next-client';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            style={{ width: '100%', overflowX: 'hidden' }}
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <>{children}</>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function LayoutsAdmin() {
    // const common = useTranslation(lang, ['common'])
    // const { t } = useTranslation(lang, ['page'])

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider', flexBasis: '15%', flexShrink: 0, height: '100vh' }}
            >
                <Tab label="Quản lý sản phẩm" {...a11yProps(0)} />
                <Tab label="Quản lý danh mục" {...a11yProps(1)} />
                <Tab label="Quản lý đơn hàng" {...a11yProps(2)} />
                <Tab label="Quản lý nhãn" {...a11yProps(3)} />
                <Tab label="Quản lý người dùng" {...a11yProps(4)} />

            </Tabs>
            <TabPanel value={value} index={0}>
                <ProductManagement />
            </TabPanel>
            <TabPanel value={value} index={1}>
                {value == 1 && <CategoryManagement value={value} />}
            </TabPanel>
            <TabPanel value={value} index={2}>
                <OrderManagement />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <LabelManagement />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <UserManagement />
            </TabPanel>
        </Box>
    );
}