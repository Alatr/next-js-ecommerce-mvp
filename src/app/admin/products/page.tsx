import { Button } from "@/components/ui/button";
import { PageHeader } from "../_components/page-header";
import Link from "next/link";
import { ProductsTable } from "./_components/products-table";

export default async function ProductsPage() {
  return (
    <>
      <div className="flex justify-between content-center">
        <PageHeader>Products</PageHeader>
        <Button asChild>
          <Link href="/admin/products/new-product">Add Product</Link>
        </Button>
      </div>
      <ProductsTable />
    </>
  );
}
