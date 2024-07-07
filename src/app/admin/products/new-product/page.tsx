import { PageHeader } from "../../_components/page-header";
import { NewProductForm } from "../_components/new-product-form";

export default async function NewProductsPage() {
  return (
    <div className="p-4">
      <PageHeader>Add product</PageHeader>
      <NewProductForm />
    </div>
  );
}
