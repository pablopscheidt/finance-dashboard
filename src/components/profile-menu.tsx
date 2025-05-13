'use client';

import { useState, MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export function ProfileMenu() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleProfile = () => {
    handleClose();
    router.push('/dashboard/profile');
  };

  const handleLogout = () => {
    handleClose();
    document.cookie = 'logged=; path=/; max-age=0';
    router.push('/login');
  };

  const menuWidth = anchorEl?.getBoundingClientRect().width ?? 'auto';

  return (
    <>
      <Box
        onClick={handleOpen}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 1,
          py: 0.5,
          mb: 2,
          cursor: 'pointer',
          borderRadius: 2,
          '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' },
        }}
      >
        <Avatar src="/avatar.png" alt="User Avatar" />
        <Box sx={{ flexGrow: 1, textAlign: 'left' }}>
          <Typography variant="subtitle1">Pablo Pscheidt</Typography>
          <Typography variant="body2" color="text.secondary">
            admin@admin.com
          </Typography>
        </Box>
        <MoreVertIcon color="action" />
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        PaperProps={{
          elevation: 4,
          sx: {
            mt: 1,
            width: menuWidth,
          },
        }}
      >
        <MenuItem onClick={handleProfile}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Profile</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
