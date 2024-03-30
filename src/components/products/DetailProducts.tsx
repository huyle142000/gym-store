import React from 'react'
import { Typography, Paper, Button, Card, CardContent, CardMedia } from '@mui/material';

type Product = {
    name: string,
    image: string,
    description: string,
    price: string
}
type Props = {
    product: Product
}

const DetailProducts = ({ product }: Props) => {
    return (
        <Card>
            <CardMedia
                component="img"
                alt={product?.name}
                height="140"
                image={product?.image}
            />
            <CardContent>
                <Typography variant="h5" component="div">
                    {product?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product?.description}
                </Typography>
                <Typography variant="body1" color="text.primary">
                    Price: ${product?.price}
                </Typography>
                {/* Thêm các thông tin khác của sản phẩm tại đây */}

                {/* Ví dụ: Thêm nút mua hàng */}
                <Button variant="contained" color="primary">
                    Add to Cart
                </Button>
            </CardContent>
        </Card>
    )
}

export default DetailProducts