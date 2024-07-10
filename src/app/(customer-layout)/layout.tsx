import { Nav, NavLink } from "@/components/Nav";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav>
        <NavLink href={"/"}>Home</NavLink>
        <NavLink href={"/products"}>Products</NavLink>
        <NavLink href={"/orders"}>My Orders</NavLink>
      </Nav>
      <main className="p-4">{children}</main>
    </>
  );
}
