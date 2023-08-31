import {
  AppBar,
  Box,
  Container,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toggleThemeMode } from "@/common/reducers/app.slice";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import AdbIcon from "@mui/icons-material/Adb";
import UserButton from "../user-button";
import { NavbarProps } from ".";
import { cn } from "@/common/utils/helpers";
import RightActionButtons from "./components/right-action-buttons";
import StoreSwitcher from "../store-switcher";

const MobileNavbar = ({  }: NavbarProps) => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  const themeMode = useSelector((state: RootState) => state.app.themeMode);

  const handleToggleTheme = useCallback(() => {
    console.log("handleToggleTheme");
    dispatch(toggleThemeMode());
  }, [dispatch]);

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
    <AppBar position="static">
      <Container
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
          maxWidth: "100% !important",
        }}
      >
        <Toolbar disableGutters>
          {/*<Box sx={{ flexGrow: 1 }}>
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
                <MenuItem key={route.id} sx={{display:'flex',flexDirection:'column',width:'fit-content'}}    onClick={()=>{
                  console.log('route clicked',route)
                }}>
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
                </MenuItem>
              ))}
            </Menu>
          </Box>*/}

          <StoreSwitcher/>

          <RightActionButtons/>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MobileNavbar;
