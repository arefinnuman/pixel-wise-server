import { SortOrder } from 'mongoose';
import { PaginationHelpers } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interface/genericResponse';
import { IPaginationOptions } from '../../../interface/pagination';
import { productSearchableFields } from './products.constant';
import { IProduct, IProductFilters } from './products.interface';
import { Product } from './products.model';

const createProduct = async (product: IProduct) => {
  const newProduct = new Product(product);
  await newProduct.save();
  return newProduct;
};

const getAllProduct = async (
  filters: IProductFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IProduct[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: productSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Product.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Product.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getProductById = async (id: string) => {
  const result = await Product.findOne({ _id: id });
  return result;
};

const getRandomProducts = async () => {
  const result = await Product.aggregate([{ $sample: { size: 6 } }]);
  return result;
};

// get only category names
const getCategoriesName = async () => {
  const result = await Product.find().distinct('category');
  return result;
};

//  get

export const ProductService = {
  createProduct,
  getAllProduct,
  getProductById,
  getRandomProducts,
  getCategoriesName,
};
