import express from 'express';
import { ProductController } from './products.controller';

const router = express.Router();

router.post('/create-product', ProductController.createProduct);

router.get('/random', ProductController.getRandomProducts);

router.get('/categories', ProductController.getCategoriesName);

router.get('/', ProductController.getAllProducts);

router.get('/all-products', ProductController.getAllProducts);

router.get('/all-products/:id', ProductController.getProductById);

router.get('/:category', ProductController.getProductByCategory);

export const ProductRoutes = router;
