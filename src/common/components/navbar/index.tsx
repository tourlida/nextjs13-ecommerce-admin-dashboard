import {
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { redirect, useParams, usePathname } from "next/navigation";
import MobileNavbar from "./mobile-navbar";
import DesktopNavbar from "./desktop-navbar";
import { useEffect, useState } from "react";
import { getUserId } from "@/common/utils/helpers";
import prismadb from "@/common/utils/prismadb";

interface Route {
  id:string;
  label:string;
  href: string;
  active:boolean;
}
export interface NavbarProps {
}

export default async function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const userId = await getUserId();
       
  if(!userId){
      redirect('/')
  }

  //Load all stores
  const stores = await prismadb.store.findMany({
      where:{
          userId
      }
  })
  console.log('stores->',stores)

  return isMobile ? (
    <MobileNavbar />
  ) : (
    <DesktopNavbar />
  );
}
