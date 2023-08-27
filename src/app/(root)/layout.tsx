"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { redirect } from "next/navigation";

export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const store: any = {
    id: "teststore",
  };

  if (user) {
    if (store) {
      redirect(`/store/${store.id}`);
    } else {
      redirect("/store");
    }
  } else {
    redirect("/api/auth/login");
  }
}
