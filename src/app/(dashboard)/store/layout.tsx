"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {Stack, ThemeProvider, createTheme } from "@mui/material";
import { useMemo } from "react";
import Navbar from "@/common/components/navbar/index";
import { useUser } from "@auth0/nextjs-auth0/client";
import { redirect } from "next/navigation";

export default function StoreRootPage({
    children,
  }: {
    children: React.ReactNode;
  }) {
    
  const themeMode = useSelector((state: RootState) => state.app.themeMode);
  const { user, error, isLoading } = useUser();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
        },
      }),
    [themeMode]
  );

  if(!user){
    redirect("/api/auth/login");
  }
  return (
    <ThemeProvider theme={theme}>
      <Stack
        sx={{
          height: "100%",
          width: "100%",

          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <Navbar/>
        {children}
      </Stack>
    </ThemeProvider>
  );
}
