"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { FC, startTransition, useTransition } from "react";
import { toggleProductAvailability, deleteProduct } from "../_actions/products";
import { useRouter } from "next/navigation";

interface ToggleProductAvailabilityProps {
  isAvailableForPurchase: boolean;
  id: string;
}

export const ToggleProductAvailability: FC<ToggleProductAvailabilityProps> = (
  props
): React.ReactNode => {
  const { isAvailableForPurchase, id } = props;
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = () => {
    startTransition(async () => {
      await toggleProductAvailability(id, !isAvailableForPurchase);
      router.refresh();
    });
  };

  return (
    <DropdownMenuItem disabled={isPending} onClick={handleClick}>
      {isAvailableForPurchase ? "Deactivate" : "Activate"}
    </DropdownMenuItem>
  );
};

interface DeleteDropdownItemProps {
  id: string;
  disabled: boolean;
}

export const DeleteDropdownItem: FC<DeleteDropdownItemProps> = (
  props
): React.ReactNode => {
  const { id, disabled } = props;
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = () => {
    startTransition(async () => {
      await deleteProduct(id);
      router.refresh();
    });
  };

  return (
    <DropdownMenuItem
      disabled={disabled || isPending}
      variant="destructive"
      onClick={handleClick}
    >
      Delete
    </DropdownMenuItem>
  );
};
