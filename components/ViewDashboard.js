import {useState, useEffect} from 'react';
import {
  AppBar, Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemIcon,
  ListItemText, Toolbar, Typography,
} from '@mui/material';
import {DATA_MENU_DOWN, DATA_MENU_USER} from '../constants';
import {Helper} from '../libs/Helper';
import {useRouter} from 'next/router';
import MenuIcon from '@mui/icons-material/Menu';
import MenuList from './MenuList';
import BoxHead from './BoxHead';

const WIDTH_DRAWER = 240;

export default function ViewDashboard(props) {
  const {window, children, select = 0, rightView} = props;
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const token = Helper.getToken();
    if (!token) {
      router.replace('/');
    }
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  function _handleMenuDown(item) {
    if (item.push) {
      if (item.push === '/') {
        Helper.removeToken();
        Helper.removeRefreshToken();
      }
      router.replace(item.push);
    }
  }

  const _renderDrawer = function() {
    return (
      <div>
        <MenuList />
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
    );
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <BoxHead title={DATA_MENU_USER[select]?.text ?? null}>
      <CssBaseline />
      <AppBar
        position={'fixed'}
        color={'default'}
        sx={{
          width: {sm: `calc(100% - ${WIDTH_DRAWER}px)`},
          ml: {sm: `${WIDTH_DRAWER}px`},
        }}
      >
        <Toolbar>
          <IconButton
            color={'inherit'}
            aria-label={'open drawer'}
            edge={'start'}
            onClick={handleDrawerToggle}
            sx={{mr: 2, display: {sm: 'none'}}}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            sx={{
              display: 'flex',
              flex: 1,
            }}
            variant={'h6'}
            noWrap
            component={'div'}
          >
            {DATA_MENU_USER[select]?.text ?? null}
          </Typography>
          {rightView && rightView()}
        </Toolbar>
      </AppBar>
      <Box
        component={'nav'}
        sx={{width: {sm: `${WIDTH_DRAWER}px`}, flexShrink: {sm: 0}}}
        aria-label={'mailbox folders'}
      >
        <Drawer
          container={container}
          variant={'temporary'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{keepMounted: true}}
          sx={{
            'display': {xs: 'block', sm: 'none'},
            '& .MuiDrawer-paper': {boxSizing: 'border-box', width: `${WIDTH_DRAWER}px`},
          }}
        >
          {_renderDrawer()}
        </Drawer>
        <Drawer
          variant={'permanent'}
          sx={{
            'display': {xs: 'none', sm: 'block'},
            '& .MuiDrawer-paper': {boxSizing: 'border-box', width: `${WIDTH_DRAWER}px`},
          }}
          open
        >
          {_renderDrawer()}
        </Drawer>
      </Box>
      <Box
        component={'main'}
        sx={{
          flex: 1,
          display: 'flex',
          bgcolor: '#EFEFEF',
          flexDirection: 'column',
          marginLeft: {xs: '0px', sm: `${WIDTH_DRAWER}px`},
          paddingTop: {xs: '0px', sm: '16px'},
          paddingBottom: {xs: '0px', sm: '16px'},
          paddingLeft: {xs: '0px', sm: '24px'},
          paddingRight: {xs: '0px', sm: '24px'},
        }}
      >
        <Toolbar />
        {children}
        <Toolbar />
      </Box>
    </BoxHead>
  );
};
