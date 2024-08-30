"use client";

import { Product } from "@/types/products/product";
import { Badge, Button, Table } from "@radix-ui/themes";
import { getProductList } from "@/services/products/main/productsService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function MainProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
      getProductList()
      .then((products: Product[]) => setProducts(products))
      .catch(
        (err: any) => {
          alert(err)
        }
      )
    }, []
  );

  function badgeColour(productStock: number) {
    switch (true) {
    case(productStock > 20):
      return 'green';
    case(productStock > 5):
      return 'yellow';
    case(productStock > 0 ):
      return 'orange';
    default:
      return 'red'
    }
  }

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>
            ID
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            Name
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            Stock
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
      {products?.map((product, index) =>
        (<Table.Row key={product.id}>
          <Table.Cell>
            <Button onClick={()=>{router.push(`/products/${product.id}`)}}>
              Details
              </Button>
          </Table.Cell>
          <Table.Cell>
            { product.name }
          </Table.Cell>
          <Table.Cell>
            <Badge color={ badgeColour(product.stock )}> {product.stock ?? 'N.A' } </Badge>
          </Table.Cell>
        </Table.Row>)
      )}
      </Table.Body>
    </Table.Root>
  )
}