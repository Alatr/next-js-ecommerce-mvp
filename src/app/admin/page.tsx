import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import db from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import React from "react";

export default async function Admin() {
  const { amount, numberOfSales } = await getSalesData();
  const { averageValuePerUser, usersCount } = await getUsersData();
  const { activeProducts, inactiveProducts } = await getProductsData();
  return (
    <>
      <DashboardCard
        title="Sales"
        subtitle={`${formatNumber(numberOfSales)} Orders`}
        body={formatCurrency(amount)}
      />
      <DashboardCard
        title="Customers"
        subtitle={`${formatCurrency(averageValuePerUser)} Average Value`}
        body={`${formatNumber(usersCount)} Customers`}
      />
      <DashboardCard
        title="Active Products"
        subtitle={`${formatNumber(activeProducts)} Active Products`}
        body={`${formatNumber(inactiveProducts)} Inactive Products`}
      />
    </>
  );
}

function wait(time: number): Promise<void> {
  return new Promise((res) => setTimeout(res, time));
}

async function getSalesData() {
  const data = await db.order.aggregate({
    _sum: { pricePaidInCents: true },
    _count: true,
  });

  return {
    amount: (data._sum.pricePaidInCents || 0) / 100,
    numberOfSales: data._count,
  };
}

async function getProductsData() {
  const [activeProducts, inactiveProducts] = await Promise.all([
    db.product.count({ where: { isAvailableForPurchase: true } }),
    db.product.count({ where: { isAvailableForPurchase: false } }),
  ]);

  return { activeProducts, inactiveProducts };
}

async function getUsersData() {
  const [usersCount, orders] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: { pricePaidInCents: true },
    }),
  ]);

  const averageValuePerUser =
    usersCount === 0
      ? 0
      : (orders._sum.pricePaidInCents || 0) / usersCount / 100;

  return { usersCount, averageValuePerUser };
}

interface DashboardCardProps {
  title: string;
  subtitle: string;
  body: string;
}
function DashboardCard(props: DashboardCardProps): React.ReactNode {
  const { body, subtitle, title } = props;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}
