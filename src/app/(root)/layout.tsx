"use client";
import { RootState } from "@/redux/store";
import { useUser } from "@auth0/nextjs-auth0/client";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, error, isLoading } = useUser();
  const store = useSelector((state: RootState) => state.app.selectedStore);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  
  console.log('[SetupLayout]store->',store)
  if (user) {
    if (store) {
      redirect(`/${store.id}`);
    }
  } else {
    redirect("/api/auth/login");
  }

  return <>{children}</>;

}
