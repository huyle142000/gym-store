// pages/products.tsx
'use client'
import { Container, CssBaseline, Typography, Paper, Grid } from '@mui/material';
import ProductItems from './ProductItems';
import SideBar from '../layouts/Sidebar';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string
}

const products: Product[] = [
  { id: 1, name: 'Product 1', description: 'Description 1', price: 19.99, image: 'abcd' },
  { id: 2, name: 'Product 2', description: 'Description 2', price: 29.99, image: 'abcd' },
  { id: 3, name: 'Product 3', description: 'Description 3', price: 39.99, image: 'abcd' },
  // Add more products as needed
];

const ProductsList: React.FC = () => {
  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
        <SideBar>
          <Typography variant="h4" gutterBottom>
            Product List
          </Typography>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductItems product={product} />
            </Grid>
          ))}
        </SideBar>
    </Container>
  );
};

export default ProductsList;
