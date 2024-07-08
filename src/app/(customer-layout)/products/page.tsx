import { ProductCard, ProductCardSkeleton } from "@/components/productCard";
import db from "@/db/db";
import { cache } from "@/lib/cache";
import { ONE_DAY } from "@/lib/const";
import { wait } from "@/lib/utils";
import { Product } from "@prisma/client";
import { Suspense } from "react";

const getProducts = cache(async () => {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
  });
}, ['/products', 'getProducts']);

export default function ProductsPage() {
  return (
    <div className="mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }
        >
          <SuspenseProduct getProducts={getProducts} />
        </Suspense>
      </div>
    </div>
  );
}

async function SuspenseProduct({
  getProducts,
}: {
  getProducts: () => Promise<Product[]>;
}) {
  const products = await getProducts();
  return (
    <>
      {products.map((products) => (
        <ProductCard key={products.id} {...products} />
      ))}
    </>
  );
}
