import { getUserId } from "@/common/utils/helpers";
import prismadb from "@/common/utils/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const userId = await getUserId();
    const body = await req.json();
    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.storeId) {
        return new NextResponse("StoreId is required", { status: 400 });
    }

    const store = await prismadb.store.updateMany({
     where:{
        id: params.storeId,
        userId
     },
     data:{
        name
     }
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string } }
  ) {
    try {
        const userId = await getUserId();
  
      if (!userId) {
        return new NextResponse("Unauthenticated", { status: 401 });
      }
    
      if (!params.storeId) {
          return new NextResponse("StoreId is required", { status: 400 });
      }
  
      const store = await prismadb.store.deleteMany({
       where:{
          id: params.storeId,
          userId
       }
      });
  
      return NextResponse.json(store);
    } catch (error) {
      console.log("[STORES_DELETE]", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  }
  