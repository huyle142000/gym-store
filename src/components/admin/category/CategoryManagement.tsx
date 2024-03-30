// ** React Imports
import React, { useCallback, useEffect, useRef, useState, } from 'react'
import _ from 'lodash'
// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

// ** Icons Imports
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// ** Store Imports

import { styled } from '@mui/material/styles'
import { RequestProcessor } from '@/services/requestProcessor'

import AddCircleIcon from '@mui/icons-material/AddCircle';
import DialogAddEditCategory from './DialogAddEditCategory'
import { Categories } from '@/types/categories'
import { deleteCategory, getCategory, postCategory } from '@/store/app/category'
import ChevronCategory from './ChevronCategory'
const IconStyled: any = styled("img")({
    cursor: 'pointer'
})

import DeleteIcon from '@mui/icons-material/Delete';



type Props = {
    value?: number
    onCloseDrawer?: () => void
    panelId?: string
    setValue?: (string: string, value: any[]) => void
}



const arrSelect = [
    { children: [], index: 0, id: null },
    { children: [], index: 1, id: null },
    { children: [], index: 2, id: null },
    { children: [], index: 3, id: null },
    { children: [], index: 4, id: null },
    { children: [], index: 5, id: null },
    { children: [], index: 6, id: null },

]

const findItemById = (id: any, itemList: any): any | undefined => {
    let foundItem = null;
    for (const item of itemList) {
        if (item._id === id) {
            foundItem = item;
            break;
        }
        if (item.children && item.children.length) {
            foundItem = findItemById(id, item.children);
            if (foundItem) break;
        }
    }

    return foundItem;
};

const CategoryManagement = ({ value, onCloseDrawer,
    panelId, setValue,  }: Props) => {

    const { useQueryWrapper } = RequestProcessor();

    const { data: categoryList }: any = useQueryWrapper<Categories[]>(
        'category',
        async () => await getCategory({})
    );

    // Dialog Option
    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenDialog = useCallback(() => setOpenDialog(true), []);
    const handleCloseDialog = useCallback(() => {
        setOpenDialog(false)
    }, [])

    // Value to post put
    const [selectedValue, setSelectedValue] = useState<any>()

    const [selectedItem, setSelectedItem] = useState([...arrSelect]);

    useEffect(() => {

        setSelectedItem([
            { children: [], index: 0, id: null },
            { children: [], index: 1, id: null },
            { children: [], index: 2, id: null },
            { children: [], index: 3, id: null },
            { children: [], index: 4, id: null },
            { children: [], index: 5, id: null },
            { children: [], index: 6, id: null },
        ]
        )
        setArrClick([])

    }, [value])




    // 
    const [arrClick, setArrClick] = useState<string[]>([])

    useEffect(() => {
        if (categoryList?.length && arrClick?.length) {
            const updatedSelectedItem = [
                { children: [], index: 0, id: null },
                { children: [], index: 1, id: null },
                { children: [], index: 2, id: null },
                { children: [], index: 3, id: null },
                { children: [], index: 4, id: null },
                { children: [], index: 5, id: null },
                { children: [], index: 6, id: null },
            ]

            arrClick.forEach((itemId, index) => {
                const selectedItemIndex = updatedSelectedItem.findIndex(item => item.index === index);
                if (selectedItemIndex !== -1) {
                    const selectedItemFound: any = findItemById(itemId, categoryList);
                    if (selectedItemFound) {
                        updatedSelectedItem[selectedItemIndex].children = selectedItemFound.children || [];
                        updatedSelectedItem[selectedItemIndex].id = selectedItemFound._id;
                    }
                }
            });
            setSelectedItem(updatedSelectedItem);
        }
    }, [categoryList]);

    const handleItemClick = (item: any, number: number) => {
        let cloneSelected: any = [...selectedItem]
        console.log(item, "item")

        cloneSelected?.map((select) => {
            if (select.index == number) {
                select.children = item?.children ? item?.children : []
                select.id = item._id
                select.parentId = item?.parentId
                select.isRoot = item?.isRoot

            }
            if (select.index > number) {
                select.children = []
                select.id = null
                select.parentId = null
                select.isRoot = false
            }
        })


        const cloneArrClick = [...arrClick]
        if (!arrClick[number]) {
            cloneArrClick[Number(number)] = item?._id
            // cloneArrClick[number] = item?._id
            setArrClick(cloneArrClick)
        } else {
            for (let j = number + 1; j < cloneArrClick.length; j++) {
                cloneArrClick[j] = ''
            }
            setArrClick(cloneArrClick)
        }



        setSelectedItem(cloneSelected);
    };

    // Scroll
    const containerRef: any = useRef(null);

    const { useMutate } = RequestProcessor()

    const deleteCategoryId = useMutate(
        'category', // Unique key to identify the mutation
        async (id: string, isRoot: boolean) => {
            try {

                const response = await deleteCategory({ id })

                // setSelectedItem((prev: any) => {
                //     prev?.map((old: any) => {
                //         old.children = []
                //         return old
                //     })
                // })
                handleCloseDialog()
                setSelectedValue(null)
                return response.json(); // Parse response data if needed
            } catch (error) {
                console.error('Category posting failed:', error);
                throw error; // Re-throw to handle errors in components
            }
        },
    );
    const ListItem = ({ item, handleItemClick, number }: any) => {

        return <Stack justifyContent={'space-between'} direction={'row'} style={{ cursor: 'pointer' }}
            className={`category-item-${item?._id} category-item-click`}
            onClick={(e) => {
                handleItemClick(item, number)
                let checkSelected = e.currentTarget
                if (checkSelected?.className.includes('selected')) {
                    checkSelected.classList.remove('selected')

                } else {
                    checkSelected.classList.add('selected')
                }

                // Remove same  level in tree

                let getChildFromParent: any = e.currentTarget.parentElement?.querySelectorAll('.selected')
                if (getChildFromParent) {
                    getChildFromParent = Array.from(getChildFromParent)
                    for (let index = 0; index < getChildFromParent.length; index++) {
                        const element = getChildFromParent[index].className;
                        console.log(element, "element")
                        if (!element.includes(`category-item-${item?._id}`)) {
                            getChildFromParent[index].classList.remove('selected')

                        }
                    }
                }


            }}
            sx={{
                '&.selected': {
                    '.text,.icon': {
                        color: 'orange'
                    }
                },
                padding: '10px 0',
                width: '100%'
            }}
        >
            <Typography
                className='text'
                sx={{
                }}
            >
                {item?.name ? item?.name : ""}
            </Typography>
            <Box>
                {<DeleteIcon sx={{ mr: 1, ml: 2 }} onClick={() => {
                    deleteCategoryId.mutate(item?._id)
                }} />}
                {item?.children?.length > 0 && <ChevronRightIcon className='icon' />}
            </Box>

        </Stack >
    }



    return (
        <Box sx={{ padding: '20px', display: 'flex', justifyContent: 'center', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
            <Box className="white-box" sx={{ border: '1px solid rgba(76, 78, 100, 0.12)', borderRadius: '10px', width: '100%', position: 'relative', padding: '20px', }}>

                <ChevronCategory containerRef={containerRef}
                    selectedItem={selectedItem}

                />
                <Box sx={{ width: '100%', overflowX: 'auto', }}
                    ref={containerRef}
                    className="container-category"
                >

                    <Box
                        className="wrap-item"
                        sx={{ display: 'flex', whiteSpace: 'nowrap', width: 'fit-content' }}>
                        <Box >
                            <Typography color={'primary'} sx={{ fontSize: '18px', fontWeight: '600' }}>
                                {"Thêm danh mục gốc"}
                            </Typography>
                            <Box sx={{ padding: '20px 0' }}>
                                {categoryList?.map((item: Categories, index: number) => (
                                    <React.Fragment key={item?._id} >
                                        <ListItem item={item} handleItemClick={handleItemClick} number={0} />
                                    </React.Fragment>

                                ))}
                            </Box>

                            <Button startIcon={<AddCircleIcon color='primary' />} fullWidth onClick={() => {
                                setSelectedValue({
                                    name: "Thêm danh mục",
                                    label: "Danh mục sản phẩm",
                                    placeholder: "Nhập",
                                    isRoot: true
                                })
                                handleOpenDialog()
                            }}>
                                Add
                            </Button>
                        </Box>
                        {selectedItem && (
                            <React.Fragment>
                                {selectedItem?.map((items: any, index) => {
                                    return <Box key={index} sx={{ width: '250px', display: items?.id ? 'block' : 'none' }} >
                                        {items?.id && <Typography sx={{ color: 'primary', fontSize: '16px', fontWeight: '600', paddingBottom: '10px', ml: 3, mt: 0.3 }}>
                                            Danh mục nhánh {index + 1}
                                        </Typography>
                                        }
                                        {items?.children?.map((item: Categories) => (
                                            <React.Fragment key={item?._id} >
                                                <ListItem item={item} handleItemClick={handleItemClick} number={index + 1} />
                                            </React.Fragment>
                                        ))}
                                        {items?.id && <Button startIcon={<AddCircleIcon color='primary' />} fullWidth onClick={() => {
                                            setSelectedValue({
                                                name: "Thêm danh mục",
                                                label: "Danh mục",
                                                placeholder: "Nhập",
                                                _id: items?.id
                                            })
                                            handleOpenDialog()
                                        }}>
                                            Add
                                        </Button>}
                                    </Box>

                                })}
                            </React.Fragment>
                        )}
                    </Box>


                </Box>
            </Box>
            <DialogAddEditCategory
                openDialog={openDialog}
                handleCloseDialog={handleCloseDialog}
                selectedValue={selectedValue}
                setSelectedItem={setSelectedItem}
                setSelectedValue={setSelectedValue}

            />



            {/* PopUpDetele */}
            {/* <NotifyFunction
                    typeNotify={"confirm"}
                    refChild={refChildNotify}
                    handleConfirm={handleConfirm}
                    contentConfirm={
                        <span>
                            Bạn có chắc chắn muốn xoá lĩnh vực <b style={{ color: '#636366', fontWeight: '600' }}>{nameTitle}</b> không?
                        </span >
                    }
                /> */}
        </Box >
    )
}
export default CategoryManagement
