import { redirect } from "next/navigation";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {

    const store:any ={
        id:'teststore'
    }
    if (store) {
      redirect(`/store/${store.id}`);
    }else{
      redirect('store');
    }

  return <>{children}</>;
}
