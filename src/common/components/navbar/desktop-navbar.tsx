import { AppBar, Box, Button, Container, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import UserButton from "../user-button";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import AdbIcon from "@mui/icons-material/Adb";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { cn } from "@/common/utils/helpers";
import { toggleThemeMode } from "@/common/reducers/app.slice";
import { NavbarProps } from ".";
import { useCallback } from "react";

export default function DesktopNavbar({
  routes,
}: NavbarProps) {
  const dispatch = useDispatch();
  const themeMode = useSelector((state: RootState) => state.app.themeMode);
  
  const handleToggleTheme = useCallback(() => {
    console.log("handleToggleTheme");
    dispatch(toggleThemeMode());
  },[dispatch]);

  const rightActionButtons = [
    {
      id: "theme-button",
      buttonEl: (
        <IconButton
          sx={{ ml: 1 }}
          size="small"
          onClick={handleToggleTheme}
          color="inherit"
        >
          {themeMode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      ),
    },
    {
      id: "user-info-button",
      buttonEl: <UserButton />,
    },
  ];

  return (
    <AppBar position="static">
      <Container
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
          maxWidth:'100% !important'
        }}
      >
        <Toolbar disableGutters sx={{width:'100%'}}>
          <AdbIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/store"
            sx={{
              mr: 2,
              display:  "flex",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Store switcher
          </Typography>
          <Box sx={{ flexGrow: 1, display: "flex"  }}>
            {routes.map((route) => (
              <Button
                key={route.id}
                onClick={()=>{
                  console.log('route clicked',route)
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
                      ? themeMode==='light' ?"text-black darl:text-white"  :"text-white darl:text-black"
                      : "initial"
                  )}
                  style={{
                    textDecoration:'none',
                    color:'inherit'
                  }}
                >
                  {route.label}
                </Link>

                {route.active && 
                  <Box
                    sx={{
                      height: "2px",
                      width: "100%",
                      bgcolor: "text.primary",

                   }}
                  ></Box>
              }
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Stack direction="row" spacing={1}>
              {rightActionButtons.map((rightActionButton) => {
                return rightActionButton.buttonEl;
              })}
            </Stack>
          </Box>
        </Toolbar>


        </Container>  
     
    </AppBar>
  );
}
