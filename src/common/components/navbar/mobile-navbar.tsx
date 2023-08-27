import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import {  useCallback, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toggleThemeMode } from "@/common/reducers/app.slice";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import AdbIcon from "@mui/icons-material/Adb";
import UserButton from "../user-button";
import { NavbarProps } from ".";

const MobileNavbar = ({ routes }: NavbarProps) => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  const themeMode = useSelector((state: RootState) => state.app.themeMode);

  const handleToggleTheme = useCallback(() => {
    console.log("handleToggleTheme");
    dispatch(toggleThemeMode());
  },[dispatch]);

  const handleOpenNavMenu =  useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  },[]);
  
  const handleCloseNavMenu =  useCallback(() => {
    setAnchorElNav(null);
  },[]);

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
        maxWidth="xl"
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <Toolbar disableGutters sx={{ width: "100%" }}>
          <Box sx={{ flexGrow: 1 }}>
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
                <MenuItem key={route.label} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" component="div">
                    {route.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <AdbIcon sx={{ mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/store"
            sx={{
              mr: 2,
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Store Switcher
          </Typography>

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
};

export default MobileNavbar;
