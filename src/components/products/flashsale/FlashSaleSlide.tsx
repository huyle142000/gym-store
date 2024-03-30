'use client'

import { Product } from "@/types/product";
import { Box, Typography } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import CountdownTimer from "./CoutdownTimer";

type Props = {
  products: Product[]
}

export default function FlashSaleSlide({ products }: Props) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Box sx={{ boxShadow: '0px 0px 2px 2px #efecec', '& .slick-prev:before, .slick-next:before': { color: '#000' }, padding: '10px', borderRadius: '12px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ color: 'rgb(242, 82, 32)', mr: 2, fontWeight: '700' }}>FLASH SALE</Typography>
          <CountdownTimer />
        </Box>

        <Typography sx={{ color: 'rgb(242, 82, 32)' }}>Watch all &gt; </Typography>

      </Box>
      {products && <Slider {...settings}>
        {[...products]?.map((product: Product, index: number) => {
          return <Box key={index} sx={{ padding: '5px 10px', }}  >
            <img src={product.image ? product.image : '/images/image-default.png'} alt="" style={{ height: '170px' }} />
            <Typography>{product?.price}đ</Typography>
            <Box sx={{ position: 'relative', width: '100%', padding: '0px', borderRadius: '24px', height: '20px' }}>
              <Typography sx={{ position: 'absolute', transform: 'translate(50%,-50%)', top: '50%', right: '50%', fontSize: '12px', fontWeight: '600', color: '#fff', zIndex: 3 }}>{product?.sellSaleProduct} <span style={{ textTransform: 'uppercase' }} >{product?.sellSaleProduct > 10 ? "SOLD" : "Bestselling"}</span></Typography>
              <Box sx={{ background: 'url(https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/flashsale/ac7f81d9ee062223753413ec98497a86.png) 0 100% no-repeat', width: `${product.sellSaleProduct / product.quantitySale * 100}%`, position: 'absolute', height: '100%', top: 0, zIndex: 2 }}></Box>
              <Box sx={{ background: '#ffbda6', width: `100%`, position: 'absolute', height: '100%', borderRadius: '24px', top: 0 }}></Box>
            </Box>
          </Box>
        })}
      </Slider>
      }
    </Box>
  );
}