"use client";

import ProductDetailsView from "@/components/products/details";
import { Product } from "@/types/products/product";
import { useState, useEffect } from "react";
import { Text } from "@radix-ui/themes";
import { getProductById } from "@/services/products/main/productsService";
export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  const productId = params.id;

  const [product, setProduct] = useState<Product>();
  const [productError, setProductError] = useState<string>();

  useEffect(() => {
    getProductById(productId)
      .then((product: Product | undefined) => {
        setProduct(product);
        console.log(product);
      })
      .catch((error: any) => {
        setProductError(error);
      });
  }, []);

  return (
    <>
      <Text color={"blue"} size={"8"}>
        Main Product Page
      </Text>
      {productError && (
        <Text color={"red"} size={"5"}>
          {productError}
        </Text>
      )}
      {!productError && (
        <ProductDetailsView>
          <ProductDetailsView.Datalist
            product={product}
          ></ProductDetailsView.Datalist>
          <ProductDetailsView.Bottom
            description={"BEST WORKSHOP EVAH"}
          ></ProductDetailsView.Bottom>
        </ProductDetailsView>
      )}
    </>
  );
}
