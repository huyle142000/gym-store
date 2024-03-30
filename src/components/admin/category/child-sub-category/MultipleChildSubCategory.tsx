/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useImperativeHandle, useState, Ref } from 'react'

// MUI
import { Autocomplete, Checkbox, Chip, TextField, } from '@mui/material'

// ICON
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// Store
import { RequestProcessor } from '@/services/requestProcessor';
import { ChildSubCategories } from '@/types/categories';
import { getChildSubCategory } from '@/store/app/child-sub-category';

type Props = {
    refChild?: Ref<any>
    isFilter: boolean
    showError?: boolean
    disabled?: boolean
    valueController?: string
    title?: any
    handleChangeChildSubCategory: (e: any) => void
    setValue?: any
}

const MultipleChildSubCategory = ({
    refChild,
    isFilter,
    disabled = false,
    showError,
    title,
    handleChangeChildSubCategory,
    setValue
}: Props) => {
    const { useQueryWrapper } = RequestProcessor();

    const { data: childSubCategoryList }: any = useQueryWrapper<ChildSubCategories[]>(
        'childSubCategory',
        getChildSubCategory
    );

    const [subCategory, setChildSubCategory] = useState<any>([]);


    useImperativeHandle(refChild, () => ({
        setChildSubCategory,
        listChildSubCategory: childSubCategoryList
    }));

    useEffect(() => {
        if (childSubCategoryList?.length == 0) {
            return
        }
        if (!subCategory.includes("allChildSubCategory") && subCategory.length == childSubCategoryList?.length) {
            setChildSubCategory((prev: any) => [...prev, 'allChildSubCategory'])
        } else {
            if (subCategory.length - 1 < childSubCategoryList?.length && subCategory.includes("allChildSubCategory")) {

                setChildSubCategory((prev: any) => prev.filter((value: any) => value !== "allChildSubCategory"));
            }
        }
        setValue('subCategorys', subCategory)
    }, [subCategory, childSubCategoryList])


    return <Autocomplete
        fullWidth
        multiple
        disableCloseOnSelect
        disabled={disabled}
        id="oganization-id"
        value={subCategory ? subCategory : ''}
        renderInput={(params: any) => (
            <TextField
                label={
                    disabled == false ?
                        isFilter ?
                            <span >
                                {title}
                            </span>
                            : <span >
                                {title} <span className='color_red'>*</span>
                            </span>
                        : ''
                }
                error={isFilter ? false : showError}
                {...params}
                sx={{
                    '& .Mui-disabled': {
                        input: {
                            WebkitTextFillColor: "#3A3A3C",
                        }
                    },
                    '& .MuiChip-label': {
                        textTransform: 'uppercase'
                    }

                }}

            />
        )}

        options={["allChildSubCategory", ...childSubCategoryList]}
        onChange={(event: any, newInputValue: any, reason: any, details: any) => {
            if (details?.option == 'allChildSubCategory') {
                if (subCategory?.length < childSubCategoryList.length) {
                    setChildSubCategory(childSubCategoryList)
                } else {
                    setChildSubCategory([]);
                }
            } else {
                setChildSubCategory(newInputValue)
                handleChangeChildSubCategory(newInputValue)
            }
        }}

        getOptionLabel={(option: any) => {
            if (option == "allChildSubCategory") {
                return ''
            }

            return option["name"] || "Tất cả"
        }}
        isOptionEqualToValue={(option: { name: any; }, value: { name: any; }) => {

            return option?.name === value?.name
        }
        }
        renderTags={(value: any, getTagProps: any) =>
            value.map((option: any, index: any) => {
                if (option == "allChildSubCategory") {
                    return ''
                }

                return <React.Fragment key={index}>
                    <Chip

                        label={option.name}
                        {...getTagProps({ index })}
                        sx={{
                            background: '#FEF3F2',
                            color: 'red',
                        }}
                    />
                </React.Fragment>
            })
        }

        renderOption={(props: any, option: any, { selected }: any) => {
            const optionKey = option._id;

            if (option == "allChildSubCategory") {
                return <li {...props} >
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    Tất cả các ChildSubCategory
                </li>
            }

            return <li {...props}
                key={optionKey}
                style={{ textTransform: 'uppercase' }}
            >
                <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                />
                {option.name}
            </li>
        }}


        sx={{
            '& MuiAutosubCategoryplete-poper li': {
                borderBottom: '1px solid #EDEDF2',
            },
            '& MuiAutosubCategoryplete-poper li:last-child': {
                borderBottom: 'none',
            },
            backgroundColor: disabled ? '#EDEDF2' : '',
            '.MuiAutosubCategoryplete-tag ': {
                background: '#FEF3F2!important',
            },
        }}
    />
}

export default MultipleChildSubCategory;
