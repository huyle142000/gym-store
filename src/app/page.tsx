'use client'

import FlashSaleSlide from "@/components/products/flashsale/FlashSaleSlide";
import { Product } from "@/types/product";
import { Box, Container, CssBaseline, Grid, Typography } from "@mui/material";

// CSS SLICK
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SideBar from "@/components/layouts/Sidebar";
import { api } from "@/services/service";
import Skeleton from "react-loading-skeleton";
import { RequestProcessor } from "@/services/requestProcessor";
import { Categories } from "@/types/categories";
import { getCategory } from "@/store/app/category";
import { getLabel } from "@/store/app/label";
import { Label } from "@/types/label";


const fetchProducts = async () => {
  let results: Product[] | null = null
  await api.get('/products').then(async (res) => results = await res.data).catch((err) => console.log(err))

  return results;
};
type Props = {
  data: Product[] | undefined | null,
  isLoading: boolean,
  error: any
}

export default function Home() {
  const { useQueryWrapper } = RequestProcessor();
  const { data: labelList }: any = useQueryWrapper<Label[]>(
    'label',
    async () => await getLabel({})
  );
  const { data: products, isLoading, error }: any = useQueryWrapper('products', fetchProducts);

  const { data: categoryList }: any = useQueryWrapper<Categories[]>(
    'category',
    async () => await getCategory({})
  );
 

  if (isLoading) {
    // Hiển thị Skeleton trong khi dữ liệu đang được tải
    return (
      <div>
        <Skeleton count={5} height={100} />
      </div>
    );
  }
  if (error) {
    console.log(error, "error")
    return '';
  }

  return (
    <Box>
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        {/* <SideBar> */}
        {products && <FlashSaleSlide products={products?.filter((product: Product) => product.isSale)} />}
        {/* </SideBar> */}
      </Container>
    </Box>
  )
}
