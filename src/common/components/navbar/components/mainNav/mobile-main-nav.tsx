"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { cn } from "@/common/utils/helpers";
import { Route } from ".";
import { useCallback, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

export default function MobileMainNav({ routes }: { routes: Route[] }) {
  const pathname = usePathname();
  const params = useParams();
  const themeMode = useSelector((state: RootState) => state.app.themeMode);

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const handleOpenNavMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
    },
    []
  );
  const handleCloseNavMenu = useCallback(() => {
    setAnchorElNav(null);
  }, []);

  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
      >
        {routes.map((route) => (
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
            <MenuItem
              key={route.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
              onClick={handleCloseNavMenu}
            >
              <Typography component="div" variant="button">
                {route.label}

              {route.active && (
                <Box
                  sx={{
                    height: "2px",
                    width: "100%",
                    bgcolor: "text.primary",
                  }}
                ></Box>
              )}
              </Typography>

            </MenuItem>
          </Link>
        ))}
      </Menu>
    </Box>
  );
}
