"use client";
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
//import { useUser } from "@auth0/nextjs-auth0/client";
import { useCallback, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";
import { styled } from '@mui/system';

const LogoutLabel =  styled('a')(({ theme }) => ({
  color:  theme.palette.text.primary,
  textDecoration:'none'
}));

export default function UserButton() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  //const { user } = useUser();
  //todo update when auth0 configured
  const user = {
    name:'Vagia Tourlida',
    email:'vagiatourlida@hotmail.com'
  };

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleLogout = useCallback(() => {
    router.push("/api/auth/logout");
  }, [router]);

  if (!user) return null;

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Avatar sx={{ width: 32, height: 32, bgcolor: "#512DA6" , color:'white' }}>
          {user.name?.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
      >
        <Stack
          direction="row"
          gap={2}
          padding={2}
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <Avatar sx={{ width: 44, height: 44, bgcolor: "#512DA6", color:'white' }}>
            {user.name?.charAt(0).toUpperCase()}
          </Avatar>
          <Stack>
            <Typography
              component="div"
              variant="body1"
              sx={{
                wordBreak: "break-word",
                fontWeight: "600",
              }}
            >
              {user.name}
            </Typography>
            <Typography
              component="div"
              variant="body2"
              sx={{
                wordBreak: "break-word",
              }}
            >
              {user.email}
            </Typography>
          </Stack>
        </Stack>
        <Divider sx={{ width: "calc(100% - 32px)", margin: "auto" }} />
        <LogoutLabel href="/api/auth/logout">
          <MenuItem onClick={handleLogout} href="/api/auth/logout">
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </LogoutLabel>
      </Menu>
    </>
  );
}
