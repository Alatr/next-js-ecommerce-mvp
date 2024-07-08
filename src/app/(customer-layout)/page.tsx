import { ProductCard, ProductCardSkeleton } from "@/components/productCard";
import { Button } from "@/components/ui/button";
import db from "@/db/db";
import { wait } from "@/lib/utils";
import { Product } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";

const getMostPopularProducts = async () => {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { orders: { _count: "desc" } },
    take: 6,
  });
};

const getNewestProducts = async () => {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });
};

export default async function HomePage() {
  return (
    <>
      <ProductsGrid
        title="Most Popular"
        productsFetcher={getMostPopularProducts}
      />
      <ProductsGrid title="Newest" productsFetcher={getNewestProducts} />;
    </>
  );
}

interface ProductsGridProps {
  title: string;
  productsFetcher: () => Promise<Product[]>;
}

function ProductsGrid(props: ProductsGridProps) {
  const { title, productsFetcher } = props;
  return (
    <div className="mb-4">
      <div className="flex gap-4 content-center mb-4">
        <h2 className="text-3xl font-bold">{title}</h2>
        <Button variant="outline" asChild>
          <Link href="/products" className="space-x-2">
            <span>View All</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }
        >
          <SuspenseProduct productsFetcher={productsFetcher} />
        </Suspense>
      </div>
    </div>
  );
}

async function SuspenseProduct({
  productsFetcher,
}: {
  productsFetcher: () => Promise<Product[]>;
}) {
  const products = await productsFetcher();
  return (
    <>
      {products.map((products) => (
        <ProductCard key={products.id} {...products} />
      ))}
    </>
  );
}
