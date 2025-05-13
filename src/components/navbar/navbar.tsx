'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { BottomNavigation, BottomNavigationAction, Divider, ListItemIcon, Menu, MenuItem, Paper, Typography } from '@mui/material';
import { ChartDonut, Swap, User } from '@phosphor-icons/react';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState<string>(pathname);
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
  
    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        setAnchorEl(event.currentTarget)
    };
    const handleClose = () => {
        setAnchorEl(null)
    };
  
    const handleProfile = () => {
      handleClose();
      router.push('/dashboard/profile');
    };
  
    const handleLogout = () => {
      handleClose();
      document.cookie = 'logged=; path=/; max-age=0';
      router.push('/login');
    };

    useEffect(() => {
        setValue(pathname)
    }, [pathname])

  const navItems: { label: string; icon: React.JSX.Element; path: string }[] = [
    { 
        label: 'Dashboard',    
        icon: <ChartDonut size={20} />,        
        path: '/dashboard' 
    },
    { 
        label: 'Transactions', 
        icon: <Swap size={20} />,   
        path: '/dashboard/transactions' 
    }
  ];

  return (
    <Paper 
      elevation={4}
      sx={{
        width: "100%"
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_, newValue) => {
          router.push(newValue);
        }}
      >
        {navItems.map(item => (
          <BottomNavigationAction
            key={item.path}
            label={item.label}
            icon={item.icon}
            value={item.path}
          />
        ))}
        <BottomNavigationAction
            key="profile"
            label="Profile"
            icon={<User size={20} />}
            value="#"
            onClick={handleOpen}
          />
      </BottomNavigation>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
        transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        PaperProps={{
          elevation: 2,
          sx: {
            mt: 1,
            width: "90%",
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
    </Paper>
  );
}
