import ProductDetailsView from "@/components/products/details_view";
import { Product } from "@/types/products/product";
import { Text } from "@radix-ui/themes";

export default function MainProductsPage() {
  const product: Product = { id: "123123wrs", name: "test" }

  return (
    <>
      <Text color={"blue"} size={"8"}> Main Product Page</Text>
      <ProductDetailsView>
        <ProductDetailsView.Datalist product={product}></ProductDetailsView.Datalist>
        <ProductDetailsView.Bottom description={"BEST WORKSHOP EVAH"}></ProductDetailsView.Bottom>
      </ProductDetailsView>
    </>
  )
}