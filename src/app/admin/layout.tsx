import { Nav, NavLink } from "@/components/Nav";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Nav>
        <NavLink href={"/admin"}>Dashboard</NavLink>
        <NavLink href={"/admin/products"}>Products</NavLink>
        <NavLink href={"/admin/customers"}>Customers</NavLink>
        <NavLink href={"/admin/sales"}>Sales</NavLink>
      </Nav>
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {children}
      </main>
    </div>
  );
}
