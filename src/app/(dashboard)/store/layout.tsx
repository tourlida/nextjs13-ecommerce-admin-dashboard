"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Stack, ThemeProvider, createTheme } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import Navbar from "@/common/components/navbar/index";

export default function StoreRootPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  return (
    <ThemeProvider theme={theme}>
      {isMounted && (
        <Stack
          sx={{
            height: "100%",
            width: "100%",

            bgcolor: "background.default",
            color: "text.primary",
          }}
        >
          <Navbar />
          {children}
        </Stack>
      )}
    </ThemeProvider>
  );
}
