import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationField';
import catchAsync from '../../../custom/catchAsync';
import sendResponse from '../../../custom/sendResponse';
import pick from '../../../interface/pick';
import { productFilterableFields } from './products.constant';
import { ProductService } from './products.service';

const createProduct: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const product = req.body;
    const result = await ProductService.createProduct(product);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `product created successfully`,
      data: result,
    });
  },
);

const getAllProducts: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, productFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await ProductService.getAllProduct(
      filters,
      paginationOptions,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `products fetched successfully`,
      data: result,
    });
  },
);

const getProductById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ProductService.getProductById(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `product fetched successfully`,
      data: result,
    });
  },
);

const getRandomProducts: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ProductService.getRandomProducts();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `products fetched successfully`,
      data: result,
    });
  },
);

const getCategoriesName: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ProductService.getCategoriesName();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `categories fetched successfully`,
      data: result,
    });
  },
);

export const ProductController = {
  createProduct,
  getAllProducts,
  getProductById,
  getRandomProducts,
  getCategoriesName,
};
