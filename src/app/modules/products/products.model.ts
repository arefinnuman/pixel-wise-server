import { Schema, model } from 'mongoose';
import { IProduct, ProductModel } from './products.interface';

const ProductSchema = new Schema<IProduct, ProductModel>(
  {
    productName: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        'Processor',
        'Motherboard',
        'Ram',
        'Power Supply Unit',
        'Storage',
        'Monitor',
        'Other',
      ],
      required: true,
    },
    status: {
      type: String,
      enum: ['In Stock', 'Out Of Stock'],
      default: 'In Stock',
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    keyFeatures: {
      brand: {
        type: String,
        required: true,
      },
      model: {
        type: String,
        required: true,
      },
      specification: {
        type: String,
        required: true,
      },

      port: {
        type: String,
        required: true,
      },

      color: {
        type: String,
        required: true,
      },

      warranty: {
        type: String,
        required: true,
      },
    },

    individualRating: {
      type: Number,
      required: true,
    },

    averageRating: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Product = model<IProduct, ProductModel>('Product', ProductSchema);
