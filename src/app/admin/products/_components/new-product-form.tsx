"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";

import { FC, useState } from "react";
import { addProduct } from "../_actions/products";
import { useFormState, useFormStatus } from "react-dom";

interface NewProductFormProps {}

export const NewProductForm: FC<NewProductFormProps> = (
  props
): React.ReactNode => {
  const [error, action] = useFormState(addProduct, {});
  const [priceInCents, setPriceInCents] = useState<number | undefined>();
  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" name="name" required />
        {error.name && <div className="text-destructive">{error.name}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="priceInCents">Price in Cents</Label>
        <Input
          type="number"
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
        <Textarea id="description" name="description" required />
        {error.description && (
          <div className="text-destructive">{error.description}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="file">File</Label>
        <Input type="file" id="file" name="file" required />
        {error.file && <div className="text-destructive">{error.file}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">File</Label>
        <Input type="file" id="image" name="image" required />
        {error.image && <div className="text-destructive">{error.image}</div>}
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
