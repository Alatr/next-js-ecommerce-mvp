"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";

export function NavLink(
  props: Omit<ComponentProps<typeof Link>, "className">
): React.ReactNode {
  const pathName = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        "p-4 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground",
        props.href === pathName && "bg-background text-secondary-foreground"
      )}
    />
  );
}

export function Nav({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <nav className="bg-primary text-primary-foreground flex justify-center">
      {children}
    </nav>
  );
}
