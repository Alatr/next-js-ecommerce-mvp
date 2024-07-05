import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="flex justify-center items-center col-span-3 ">
      <Loader2 className="size-20 animate-spin" />
    </div>
  );
}
