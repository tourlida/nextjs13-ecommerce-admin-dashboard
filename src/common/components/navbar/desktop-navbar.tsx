import {
  AppBar,
  Container,
  Toolbar,
} from "@mui/material";

import { RootState, store } from "@/redux/store";
import {  useSelector } from "react-redux";
import {  getUserId } from "@/common/utils/helpers";
import { NavbarProps } from ".";
import { useCallback, useEffect, useState } from "react";
import StoreSwitcher from "../store-switcher";
import { redirect } from "next/navigation";
import prismadb from "@/common/utils/prismadb";
import { Store } from "@prisma/client";
import RightActionButtons from "./components/right-action-buttons";
import MainNav from "./components/main-nav";

export default function DesktopNavbar({}: NavbarProps) {

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
          <StoreSwitcher />
          <MainNav />
          <RightActionButtons />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
