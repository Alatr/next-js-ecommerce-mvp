import { PageHeader } from "@/app/admin/_components/page-header";
import { ProductForm } from "../../_components/product-form";
import db from "@/db/db";

export default async function EditProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await db.product.findUnique({ where: { id: id } });
  return (
    <div className="p-4">
      <PageHeader>EditProductPage</PageHeader>
      <ProductForm product={product} />
    </div>
  );
}
