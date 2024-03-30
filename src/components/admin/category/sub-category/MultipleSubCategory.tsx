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
import { SubCategories } from '@/types/categories';
import { getSubCategory } from '@/store/app/sub-category';

type Props = {
    refChild?: Ref<any>
    isFilter: boolean
    showError?: boolean
    disabled?: boolean
    valueController?: string
    title?: any
    handleChangeSubCategory: (e: any) => void
    setValue?: any
}

const MultipleSubCategory = ({
    refChild,
    isFilter,
    disabled = false,
    showError,
    title,
    handleChangeSubCategory,
    setValue
}: Props) => {
    const { useQueryWrapper } = RequestProcessor();

    const { data: subCategoryList }: any = useQueryWrapper<SubCategories[]>(
        'subCategory',
        getSubCategory
    );

    const [subCategory, setSubCategory] = useState<any>([]);


    useImperativeHandle(refChild, () => ({
        setSubCategory,
        listSubCategory: subCategoryList
    }));

    useEffect(() => {
        if (subCategoryList?.length == 0) {
            return
        }
        if (!subCategory.includes("allSubCategory") && subCategory.length == subCategoryList?.length) {
            setSubCategory((prev: any) => [...prev, 'allSubCategory'])
        } else {
            if (subCategory.length - 1 < subCategoryList?.length && subCategory.includes("allSubCategory")) {

                setSubCategory((prev: any) => prev.filter((value: any) => value !== "allSubCategory"));
            }
        }
        setValue('subCategorys', subCategory)
    }, [subCategory, subCategoryList])


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

        options={["allSubCategory", ...subCategoryList]}
        onChange={(event: any, newInputValue: any, reason: any, details: any) => {
            if (details?.option == 'allSubCategory') {
                if (subCategory?.length < subCategoryList.length) {
                    setSubCategory(subCategoryList)
                } else {
                    setSubCategory([]);
                }
            } else {
                setSubCategory(newInputValue)
                handleChangeSubCategory(newInputValue)
            }
        }}

        getOptionLabel={(option: any) => {
            if (option == "allSubCategory") {
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
                if (option == "allSubCategory") {
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

            if (option == "allSubCategory") {
                return <li {...props} >
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    Tất cả các SubCategory
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

export default MultipleSubCategory;
