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
          id:'store',
          label: "Store",
          href: `/${params.storeId}`,
          active: pathname === `/${params.storeId}`,
        },
        {
          id:'store-billboards',
          label: "Billboards",
          href: `/${params.storeId}/billboards`,
          active: pathname === `/${params.storeId}/billboards`,
        },
        {
          id:'store-settings',
          label: "Settings",
          href: `/${params.storeId}/settings`,
          active: pathname === `/${params.storeId}/settings`,
        },
      ];  
    return isMobile ? (
       <MobileMainNavbar routes={routes}/>
    ) : (
      <DesktopMainNavbar routes={routes}/>
    );
  }
  