import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { STORAGE } from '../actions/types';
import BoxHead from './BoxHead';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const drawerWidth = 240;

const DATA_MENU_UP = [
    {
        text: 'Menu 1',
        icon: <InboxIcon />,
        push: '/',
    },
    {
        text: 'Menu 2',
        icon: <InboxIcon />,
        push: '/',
    },
    {
        text: 'Menu 3',
        icon: <InboxIcon />,
        push: '/',
    },
];

const DATA_MENU_DOWN = [
    {
        text: 'Tentang',
        icon: <InboxIcon />,
        push: null,
    },
    {
        text: 'Logout',
        icon: <InboxIcon />,
        push: '/',
    },
];

export default function ViewDashboard(props) {
    const router = useRouter();
    const { window, children } = props;

    const [mobileOpen, setMobileOpen] = useState(false);
    const [selected, setSelected] = useState(DATA_MENU_UP[0]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    function _handleMenuUp(item) {
        setSelected(item);
        // router.replace(item.push);
    }

    function _handleMenuDown(item) {
        if (item.push) {
            if (item.push === '/') {
                localStorage.removeItem(STORAGE.TOKEN);
            }
            router.replace(item.push);
        }
    }

    function _renderDrawer() {
        return (
            <div>
                <Toolbar />
                <Divider />
                <List>
                    {DATA_MENU_UP.map((item, index) => (
                        <ListItem button key={index} onClick={() => _handleMenuUp(item)}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {DATA_MENU_DOWN.map((item, index) => (
                        <ListItem button key={index} onClick={() => _handleMenuDown(item)}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
            </div>
        )
    }

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <BoxHead title={selected?.text ?? null}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">{selected?.text ?? null}</Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {_renderDrawer()}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {_renderDrawer()}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {children}
            </Box>
        </BoxHead>
    );
}
