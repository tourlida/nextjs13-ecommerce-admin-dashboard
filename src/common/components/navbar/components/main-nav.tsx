"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { cn } from "@/common/utils/helpers";

export default function MainNav({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();
  const themeMode = useSelector((state: RootState) => state.app.themeMode);

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
  return (
    <Box sx={{ flexGrow: 1, display: "flex" }}>
            {routes.map((route) => (
              <Button
                key={route.id}
                onClick={() => {
                  console.log("route clicked", route);
                }}
                disableRipple={true}
                disableTouchRipple={true}
                sx={{ my: 2, display: "block", color: "text.primary" }}
              >
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "text-sm font-medium transition-colors  hover:text-primary",
                    route.active
                      ? themeMode === "light"
                        ? "text-black darl:text-white"
                        : "text-white darl:text-black"
                      : "initial"
                  )}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  {route.label}
                </Link>

                {route.active && (
                  <Box
                    sx={{
                      height: "2px",
                      width: "100%",
                      bgcolor: "text.primary",
                    }}
                  ></Box>
                )}
              </Button>
            ))}
          </Box>
  );
}
