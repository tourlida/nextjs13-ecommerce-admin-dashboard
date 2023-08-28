import {
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useParams, usePathname } from "next/navigation";
import MobileNavbar from "./mobile-navbar";
import DesktopNavbar from "./desktop-navbar";
import { useEffect, useState } from "react";

interface Route {
  id:string;
  label:string;
  href: string;
  active:boolean;
}
export interface NavbarProps {
  routes: Route[];
}

export default function Navbar() {
  const theme = useTheme();
  const pathname = usePathname();
  const params = useParams();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const routes = [
    {
      id:'overview',
      label: "Overview",
      href: `/store`,
      active: pathname === `/store`,
    },
    {
      id:'store',
      label: "Store",
      href: `/store/${params.storeId}`,
      active: pathname === `/store/${params.storeId}`,
    },
    {
      id:'store-billboards',
      label: "Store Billboards",
      href: `/store/${params.storeId}/billboards`,
      active: pathname === `/store/${params.storeId}/billboards`,
    },
    {
      id:'store-settings',
      label: "Store Settings",
      href: `/store/${params.storeId}/settings`,
      active: pathname === `/store/${params.storeId}/settings`,
    },
  ];

  return isMobile ? (
    <MobileNavbar routes={routes} />
  ) : (
    <DesktopNavbar routes={routes}/>
  );
}
