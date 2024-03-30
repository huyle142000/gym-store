/* eslint-disable react/display-name */
import { RequestProcessor } from '@/services/requestProcessor';
import { getCategory } from '@/store/app/category';
import { Categories } from '@/types/categories';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';

type Props = {
    refChild?: React.Ref<any>;
    isFilter: boolean;
    showError?: any;
    title?: string
    valueController?: string;
    handleChangeCategories: (e: any) => void;
};

const SelectCategory = ({ refChild, title = "Category", isFilter, showError, valueController, handleChangeCategories }: Props) => {

    const { useQueryWrapper } = RequestProcessor();

    // Query to get a list of products
    const { data: categoryList }: any = useQueryWrapper<Categories[]>(
        'category',
        getCategory
    );

    const [com, setCategory] = useState('all');
    const [nameCategory, setNameCategory] = useState('');
    const [selectWidthCategory, setSelectWidthCategory] = useState(0);
    const selectRefCategory: any = useRef(null);
    useEffect(() => {
        const handleResize = () => {
            if (selectRefCategory.current) {
                const width = selectRefCategory.current.offsetWidth;
                setSelectWidthCategory(width);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    useImperativeHandle(refChild, () => ({
        com,
        nameCategory,
    }));

    return (
        <FormControl fullWidth>
            <InputLabel id="oganization-id" error={isFilter ? '' : showError}>
                {title}{!isFilter && <span className="color_red"> *</span>}
            </InputLabel>
            <Select
                fullWidth
                value={isFilter ? com : valueController}
                id="oganization-id"
                ref={refChild || selectRefCategory}
                error={isFilter ? '' : showError}
                label={`${title}*`}
                labelId="oganization-id"
                onChange={(e: any, value: any) => {
                    setNameCategory(value?.props?.children);

                    if (isFilter) {
                        setCategory(e.target.value);
                    }
                    handleChangeCategories(e);
                }}

                inputProps={{ placeholder: 'Trạng thái' }}
                MenuProps={{
                    PaperProps: {
                        style: {
                            width: selectWidthCategory,
                            maxWidth: 'none',
                            overflow: 'auto',
                            maxHeight: '200px', // Thay đổi giá trị theo yêu cầu của bạn
                        },
                    },
                }}
                displayEmpty={true}
                renderValue={(value) => {
                    if (value == 'all') {
                        return isFilter ? "Tất cả" : 'Chọn'
                    }
                    const find: any = categoryList?.find((category: any) => category?._id === value)

                    return find?.name
                }}
            >
                <MenuItem value="all" sx={{ background: 'transparent!important', padding: !isFilter ? '0px!important' : '', pointerEvents: !isFilter ? 'none' : '' }}>{isFilter ? ' Tất cả' : ''}</MenuItem>
                {categoryList?.map((com: any, index: number) => {
                    return (
                        <MenuItem
                            key={index}
                            sx={{
                                wordBreak: 'break-word',
                                maxWidth: '100%', // Thay đổi giá trị theo yêu cầu của bạn
                                whiteSpace: 'normal',
                                textTransform: 'uppercase'
                            }}
                            value={com?._id}
                        >
                            {com.name}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
};

export default SelectCategory;
