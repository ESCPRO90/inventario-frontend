// src/components/common/Sidebar.tsx
import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  Collapse,
} from '@mui/material';
import {
  Dashboard,
  Inventory,
  People,
  LocalShipping,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  Assessment,
  ExpandLess,
  ExpandMore,
  Category,
  Store,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePermissions } from '@/hooks/usePermissions';

interface SidebarProps {
  drawerWidth: number;
  mobileOpen: boolean;
  onDrawerToggle: () => void;
}

interface MenuItem {
  text: string;
  icon: React.ReactElement;
  path?: string;
  children?: MenuItem[];
  permission?: keyof ReturnType<typeof usePermissions>;
}

const Sidebar: React.FC<SidebarProps> = ({ drawerWidth, mobileOpen, onDrawerToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const permissions = usePermissions();
  const [openItems, setOpenItems] = React.useState<string[]>(['inventario']);

  const menuItems: MenuItem[] = [
    {
      text: 'Dashboard',
      icon: <Dashboard />,
      path: '/dashboard',
    },
    {
      text: 'Inventario',
      icon: <Inventory />,
      children: [
        {
          text: 'Stock General',
          icon: <Store />,
          path: '/inventario',
          permission: 'canRead',
        },
        {
          text: 'Productos',
          icon: <Category />,
          path: '/productos',
          permission: 'canRead',
        },
        {
          text: 'Categorías',
          icon: <Category />,
          path: '/categorias',
          permission: 'canRead',
        },
      ],
    },
    {
      text: 'Movimientos',
      icon: <Assessment />,
      children: [
        {
          text: 'Entradas',
          icon: <TrendingUp />,
          path: '/entradas',
          permission: 'canRead',
        },
        {
          text: 'Salidas',
          icon: <TrendingDown />,
          path: '/salidas',
          permission: 'canRead',
        },
      ],
    },
    {
      text: 'Proveedores',
      icon: <LocalShipping />,
      path: '/proveedores',
      permission: 'canRead',
    },
    {
      text: 'Clientes',
      icon: <People />,
      path: '/clientes',
      permission: 'canRead',
    },
    {
      text: 'Reportes',
      icon: <Assessment />,
      path: '/reportes',
      permission: 'canViewReports',
    },
  ];

  const handleItemClick = (item: MenuItem) => {
    if (item.children) {
      const isOpen = openItems.includes(item.text);
      if (isOpen) {
        setOpenItems(openItems.filter(openItem => openItem !== item.text));
      } else {
        setOpenItems([...openItems, item.text]);
      }
    } else if (item.path) {
      navigate(item.path);
      if (mobileOpen) {
        onDrawerToggle();
      }
    }
  };

  const isItemActive = (path: string) => {
    return location.pathname === path;
  };

  const hasPermission = (permission?: keyof ReturnType<typeof usePermissions>) => {
    if (!permission) return true;
    return permissions[permission];
  };

  const renderMenuItem = (item: MenuItem, depth = 0) => {
    if (item.permission && !hasPermission(item.permission)) {
      return null;
    }

    const isOpen = openItems.includes(item.text);
    const isActive = item.path ? isItemActive(item.path) : false;

    return (
      <React.Fragment key={item.text}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleItemClick(item)}
            selected={isActive}
            sx={{
              pl: 2 + depth * 2,
              '&.Mui-selected': {
                backgroundColor: 'primary.light',
                color: 'primary.contrastText',
                '& .MuiListItemIcon-root': {
                  color: 'primary.contrastText',
                },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
            {item.children && (isOpen ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
        </ListItem>
        {item.children && (
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children.map(child => renderMenuItem(child, depth + 1))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  const drawer = (
    <Box>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Inventario Médico
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map(item => renderMenuItem(item))}
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;