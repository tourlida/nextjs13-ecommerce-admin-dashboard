import {
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MobileNavbar from "./mobile-navbar";
import DesktopNavbar from "./desktop-navbar";

export interface NavbarProps {
}

export default  function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return isMobile ? (
     <MobileNavbar/>
  ) : (
    <DesktopNavbar />
  );
}
