import express from 'express';
import { ProductRoutes } from '../modules/products/products.routes';

const routes = express.Router();
const moduleRoutes = [
  {
    path: '/products',
    route: ProductRoutes,
  },
];

moduleRoutes.forEach(route => routes.use(route.path, route.route));

export default routes;
