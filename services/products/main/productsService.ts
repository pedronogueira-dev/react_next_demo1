"use server";

import { uuid } from "uuidv4";
import { create} from "@/services/fileService";
import { NewProductDto, Product } from "@/types/products/product";

export async function createProduct(newProduct: NewProductDto): Promise<void> {
  const productId = uuid();
  const product: Product = {
    id: productId,
    name: newProduct.name,
  }
  create(product, 'products');
  return Promise.resolve();
}