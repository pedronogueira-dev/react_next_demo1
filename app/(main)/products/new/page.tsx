import { toast } from "react-toastify";

import ProductCreateForm from "@/components/products/create";

export default function MainNewProductPage() {
  const notifySuccess = (): void => {
    toast.success("Success!");
  }
  return <ProductCreateForm redirectUrl={`/products`} redirectCallback={() => notifySuccess()} />;
}
