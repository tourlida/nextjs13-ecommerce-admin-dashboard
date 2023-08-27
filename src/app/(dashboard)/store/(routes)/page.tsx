
interface DashboardPageProps{
  params: {storeId:string;}
}

export default async function StorePage({params}:DashboardPageProps) {


  return <div>Active store: {params.storeId}</div>;
}
