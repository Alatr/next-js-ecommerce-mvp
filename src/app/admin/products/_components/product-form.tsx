"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";

import { FC, useState } from "react";
import { addProduct, updateProduct } from "../_actions/products";
import { useFormState, useFormStatus } from "react-dom";
import { Product } from "@prisma/client";
import Image from "next/image";

interface ProductFormProps {
  product?: Product | null;
}

export const ProductForm: FC<ProductFormProps> = ({
  product,
}): React.ReactNode => {
  const [error, action] = useFormState(
    product ? updateProduct.bind(null, product?.id) : addProduct,
    {}
  );
  const [priceInCents, setPriceInCents] = useState<number | undefined>(
    product?.priceInCents
  );
  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          defaultValue={product?.name}
          id="name"
          name="name"
          required
        />
        {error.name && <div className="text-destructive">{error.name}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="priceInCents">Price in Cents</Label>
        <Input
          type="number"
          defaultValue={product?.priceInCents}
          id="priceInCents"
          name="priceInCents"
          value={priceInCents}
          onChange={(e) => setPriceInCents(Number(e.target.value))}
          required
        />
        {error.priceInCents && (
          <div className="text-destructive">{error.priceInCents}</div>
        )}
        <div className="flex justify-end content-center py-1">
          <span className="pr-1">Total:</span>
          <span>{formatCurrency(Number(priceInCents || 0) / 100)}</span>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Descriptions</Label>
        <Textarea
          defaultValue={product?.description}
          id="description"
          name="description"
          required
        />
        {error.description && (
          <div className="text-destructive">{error.description}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="file">File</Label>
        <Input type="file" id="file" name="file" required={!product} />
        {error.file && <div className="text-destructive">{error.file}</div>}
        {product != null && (
          <div className="text-muted-foreground">{product?.filePath}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">File</Label>
        <Input type="file" id="image" name="image" required={!product} />
        {error.image && <div className="text-destructive">{error.image}</div>}
        {product != null && (
          <Image src={product?.imagePath} height={300} width={400} />
        )}
      </div>

      <SubmitButton />
    </form>
  );
};

function SubmitButton() {
  const { pending } = useFormStatus();
  console.log({ pending });
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
