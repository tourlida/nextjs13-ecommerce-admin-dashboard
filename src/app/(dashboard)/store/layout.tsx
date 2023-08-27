"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {Stack, ThemeProvider, createTheme } from "@mui/material";
import { useMemo } from "react";
import Navbar from "@/common/components/navbar/index";

export default function StoreRootPage({
    children,
  }: {
    children: React.ReactNode;
  }) {
  const themeMode = useSelector((state: RootState) => state.app.themeMode);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
        },
      }),
    [themeMode]
  );

  //todo if authenticated use this
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
