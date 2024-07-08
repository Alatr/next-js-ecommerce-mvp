import { PageHeader } from "../../_components/page-header";
import { ProductForm } from "../_components/product-form";

export default async function NewProductsPage() {
  return (
    <div className="p-4">
      <PageHeader>Add product</PageHeader>
      <ProductForm />
    </div>
  );
}
