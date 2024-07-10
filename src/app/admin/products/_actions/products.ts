"use server";

import db from "@/db/db";
import { z } from "zod";
import fs from "fs/promises";
import { File } from "buffer";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/")
);

const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  priceInCents: z.coerce.number().int().min(1),
  file: fileSchema.refine((file) => file.size > 0, "Required"),
  image: imageSchema.refine((file) => file.size > 0, "Required"),
});

export async function addProduct(prevState: unknown, formData: FormData) {
  const result = productSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const { name, description, priceInCents, file, image } = result?.data || {};

  await fs.mkdir("products", { recursive: true });
  const filePath = `products/${crypto.randomUUID()}-${file.name}`;
  await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));

  await fs.mkdir("public/products", { recursive: true });
  const imagePath = `/products/${crypto.randomUUID()}-${image.name}`;
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await file.arrayBuffer())
  );

  await db.product.create({
    data: {
      isAvailableForPurchase: false,
      name,
      description,
      priceInCents,
      filePath,
      imagePath,
    },
  });
  revalidatePath("/");
  revalidatePath("/products");
  redirect("/admin/products");
}

const editSchema = productSchema.extend({
  file: fileSchema.optional(),
  image: imageSchema.optional(),
});

export async function updateProduct(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }
  const product = await db.product.findUnique({ where: { id: id } });
  if (product == null) return notFound();

  const { name, description, priceInCents, file, image } = result?.data || {};

  let filePath = product.filePath;
  let imagePath = product.imagePath;

  if (file != null && file.size > 0) {
    await fs.unlink(filePath);
    filePath = `products/${crypto.randomUUID()}-${file.name}`;
    await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));
  }

  if (image != null && image.size > 0) {
    await fs.unlink(`public${imagePath}`);
    imagePath = `/products/${crypto.randomUUID()}-${image.name}`;
    await fs.writeFile(
      `public${imagePath}`,
      Buffer.from(await image.arrayBuffer())
    );
  }

  await db.product.update({
    where: { id },
    data: {
      name,
      description,
      priceInCents,
      filePath,
      imagePath,
    },
  });
  revalidatePath("/");
  revalidatePath("/products");
  redirect("/admin/products");
}

export async function toggleProductAvailability(
  id: string,
  isAvailableForPurchase: boolean
) {
  await db.product.update({ where: { id }, data: { isAvailableForPurchase } });
  revalidatePath("/");
  revalidatePath("/products");
}

export async function deleteProduct(id: string) {
  const product = await db.product.delete({ where: { id } });
  if (product == null) return notFound();

  await fs.unlink(product.filePath);
  await fs.unlink(`public${product.imagePath}`);
  revalidatePath("/");
  revalidatePath("/products");
}
