import { AppBar, Container, Toolbar } from "@mui/material";
import { NavbarProps } from ".";
import RightActionButtons from "./components/right-action-buttons";
import StoreSwitcher from "./components/store-switcher";
import MainNav from "./components/mainNav";

const MobileNavbar = ({}: NavbarProps) => {
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
          <MainNav />
          <StoreSwitcher />
          <RightActionButtons />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MobileNavbar;
