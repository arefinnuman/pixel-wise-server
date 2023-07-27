import { Model } from 'mongoose';

export type IProduct = {
  productName: string;
  image: string;
  category:
    | 'Processor'
    | 'Motherboard'
    | 'Ram'
    | 'Power Supply Unit'
    | 'Storage'
    | 'Monitor'
    | 'Other';
  status: 'In Stock' | 'Out Of Stock';
  price: number;
  description: string;
  keyFeatures: {
    brand: string;
    model: string;
    specification: string;
    port: string;
    color: string;
    warranty: string;
  };
  individualRating: number;
  averageRating: number;
  reviews: string[];
};

export type ProductModel = Model<IProduct, Record<string, unknown>>;

export type IProductFilters = {
  searchTerm?: string;
  productName?: string;
  category?: string;
  status?: string;
  price?: string;
  individualRating?: string;
  averageRating?: string;
};
