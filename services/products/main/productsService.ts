"use server";

import { uuid } from "uuidv4";
import { create, getList} from "@/services/fileService";
import { NewProductDto, Product } from "@/types/products/product";

const entityName = 'products';

export async function createProduct(newProduct: NewProductDto): Promise<void> {
  const productId = uuid();
  const product: Product = {
    id: productId,
    name: newProduct.name,
    stock: newProduct.stock
  }
  create(product, 'products');
  return Promise.resolve();
}

export async function getProductList(): Promise<Product[]> {
  return await getList(entityName);
}

export async function getProductById(productId: string): Promise<Product | undefined> {
  const products = await getProductList();

  const product = products.find((product) => {
    return product.id == productId
  });

  return product;
}