import { getUserId } from "@/common/utils/helpers";
import prismadb from "@/common/utils/prismadb";
import { NextResponse } from "next/server"

export async function POST( req: Request) {
    try{
        const userId = await getUserId();
        const body = await req.json();
        const {name} = body;
        
        if(!userId){
            return new NextResponse('Unauthenticated',{status:401})
        }

        if(!name){
            return new NextResponse('Name is required',{status:400})
        }

        const store = await prismadb.store.create({data:{
            name,
            userId
        }});

        return NextResponse.json(store);

    }catch(error){
      console.log('[STORES_POST]',error)  
      return new NextResponse('Internal error',{status:500})
    }
}