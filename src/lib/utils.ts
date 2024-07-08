import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function wait(time: number): Promise<void> {
  return new Promise((res) => setTimeout(res, time));
}
