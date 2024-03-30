import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string
}
type Props = {
    product: Product
}

const ProductItems = ({ product }: Props) => {
    return (
        <Card>
            <CardMedia component="img" alt={product?.name} height="140" image={product?.image} />
            <CardContent>
                <Typography variant="h6" component="div">
                    {product?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product?.description}
                </Typography>
                <Typography variant="body1" color="text.primary">
                    Price: ${product?.price}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default ProductItems