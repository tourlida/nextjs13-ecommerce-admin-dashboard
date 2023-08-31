"use client";
import {
  Box,
  IconButton,
  Stack,
} from "@mui/material";
import UserButton from "./user-button";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { toggleThemeMode } from "@/common/reducers/app.slice";
import { NavbarProps } from "..";
import { useCallback} from "react";


export default function RightActionButtons() {
  const dispatch = useDispatch();
  const themeMode = useSelector((state: RootState) => state.app.themeMode);

  const handleToggleTheme = useCallback(() => {
    console.log("handleToggleTheme");
    dispatch(toggleThemeMode());
  }, [dispatch]);

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
    <Box sx={{ flexGrow: 0 }}>
      <Stack direction="row" spacing={1}>
        {rightActionButtons.map((rightActionButton) => {
          return (
            <div key={rightActionButton.id}>{rightActionButton.buttonEl}</div>
          );
        })}
      </Stack>
    </Box>
  );
}
