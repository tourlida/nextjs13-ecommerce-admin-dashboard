import prismadb from "@/common/utils/prismadb";
import BillboardForm from "./components/billboard-form";
import BillboardFormWrapper from "./components/billboard-form-wrapper";

export default async function BillboardPage({
    params
}:{
    params:{billboardId:string;}
}){
    const billlboard = await prismadb.billboard.findUnique({
        where:{
            id:params.billboardId
        }
    });

    return <div className="flex-colr">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <BillboardFormWrapper initialData={billlboard}/>
        </div>
    </div>
}

