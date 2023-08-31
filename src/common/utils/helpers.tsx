import { getSession } from "@auth0/nextjs-auth0";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getUserId() {
  const session = await getSession();
  console.log('getUserId->',session)
  return session?.user.sub || null;
}