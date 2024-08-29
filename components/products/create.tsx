"use client"
import * as Form from "@radix-ui/react-form";
import { useState } from "react";

import { NewProductDto } from "@/types/products/product";
import { createProduct } from "@/services/products/main/productsService";

export default function ProductDetailsView() {
  const [serverErrors, setServerErrors] = useState({ name: false });
  return (
    <Form.Root
      // `onSubmit` only triggered if it passes client-side validation
      onSubmit={(event) => {
        const formObj = new FormData(event.currentTarget);

        const newProduct: NewProductDto = {
          name: formObj.get('name')?.toString() ?? ''
        };
        // Submit form data and catch errors in the response
        createProduct(newProduct)
          .then(() => {})
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
      onClearServerErrors={() =>
        setServerErrors({ name: false })
      }
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
      <Form.Submit asChild>
        <button className="Button" style={{ marginTop: 10 }}>
          Create Product
        </button>
      </Form.Submit>
    </Form.Root>
  );
}
