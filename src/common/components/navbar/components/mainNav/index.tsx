import {
    useMediaQuery,
    useTheme,
  } from "@mui/material";
  import MobileMainNavbar from "./mobile-main-nav";
  import DesktopMainNavbar from "./desktop-main-nav";
import { useParams, usePathname } from "next/navigation";
  

export interface Route {
    id:string;
    label:string;
    href: string;
    active:boolean;
  }

  
  
  export default  function MainNavbar() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const pathname = usePathname();
    const params = useParams();

    const routes: Route[] = [
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
       <MobileMainNavbar routes={routes}/>
    ) : (
      <DesktopMainNavbar routes={routes}/>
    );
  }
  