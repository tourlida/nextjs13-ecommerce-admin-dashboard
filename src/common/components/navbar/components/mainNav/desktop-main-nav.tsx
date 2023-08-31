"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { cn } from "@/common/utils/helpers";
import { Route } from ".";

export default function DesktopMainNav({
    routes
  }:{
      routes:Route[];
  }){

  const themeMode = useSelector((state: RootState) => state.app.themeMode);

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
