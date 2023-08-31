
import {
  AppBar,
  Container,
  Toolbar,
} from "@mui/material";
import StoreSwitcher from "./components/store-switcher";
import RightActionButtons from "./components/right-action-buttons";
import MainNav from "./components/mainNav";


export default function DesktopNavbar() {

  return (
    <AppBar position="static">
      <Container
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
          maxWidth: "100% !important",
        }}
      >
        <Toolbar disableGutters sx={{ width: "100%" }}>
          <StoreSwitcher/>
          <MainNav />
          <RightActionButtons />
        </Toolbar>
      </Container>
    </AppBar>
  );
}