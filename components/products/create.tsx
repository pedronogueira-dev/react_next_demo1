"use client";

import * as Form from "@radix-ui/react-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { NewProductDto } from "@/types/products/product";
import { createProduct } from "@/services/products/main/productsService";


interface Props {
  redirectUrl?: string,
  redirectCallback?: () => void
}

export default function ProductCreateForm({ redirectUrl = "", redirectCallback = () => {}} : Props) {
  const router = useRouter();
  const [serverErrors, setServerErrors] = useState({ name: false });
  return (
    <Form.Root
      // `onSubmit` only triggered if it passes client-side validation
      onSubmit={(event) => {
        const formObj = new FormData(event.currentTarget);

        const newProduct: NewProductDto = {
          name: formObj.get("name")?.toString() ?? "",
          stock: parseInt(formObj.get("stock")?.toString() ?? '0') ,
        };
        // Submit form data and catch errors in the response
        createProduct(newProduct)
          .then(() => {
            if(!redirectUrl) {
              return
            }

            router.push(redirectUrl);
            redirectCallback();
          })
          /**
           * Map errors from your server response into a structure you'd like to work with.
           * In this case resulting in this object: `{ email: false, password: true }`
           */
          .catch((errors) => {
            console.log(errors);
          });

        // prevent default form submission
        event.preventDefault();
      }}
      onClearServerErrors={() => setServerErrors({ name: false })}
    >
      <Form.Field className="FormField" name="name">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Form.Label className="FormLabel">Name</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter the product's name
          </Form.Message>
        </div>
        <Form.Control asChild>
          <textarea className="Textarea" required />
        </Form.Control>
      </Form.Field>
      <Form.Field className="FormField" name="stock">
        <Form.Label className="FormLabel">Available Stock</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter the product's stock
          </Form.Message>
        <Form.Control asChild>
          <input type={"number"} step={1} min={0 }/>
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <button className="Button" style={{ marginTop: 10 }}>
          Create Product
        </button>
      </Form.Submit>
    </Form.Root>
  );
}
