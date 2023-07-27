import express from 'express';
import { ProductController } from './products.controller';

const router = express.Router();

router.post('/create-product', ProductController.createProduct);

router.get('/random', ProductController.getRandomProducts);

router.get('/categories', ProductController.getCategoriesName);

router.get('/', ProductController.getAllProducts);

router.get('/:id', ProductController.getProductById);

export const ProductRoutes = router;
