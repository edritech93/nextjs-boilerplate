import {ListSubheader, Box, List, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import {ExpandLess, ExpandMore} from '@mui/icons-material';
import {DATA_MENU_USER} from '../constants';
import {useRouter} from 'next/router';
import {connect} from 'react-redux';

function MenuList(props) {
  const router = useRouter();

  function ItemMenu(item, index) {
    return (
      <Box key={index}
        sx={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
        }}>
        <ListItemButton onClick={() => router.push(item.push)}>
          <ListItemIcon>
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.text} />
          {item.child && (
            <>
              {item.isOpen ? <ExpandLess /> : <ExpandMore />}
            </>
          )}
        </ListItemButton>
      </Box>
    );
  }

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: '360px',
        bgcolor: 'background.paper',
      }}
      component={'nav'}
      aria-labelledby={'nested-list-subheader'}
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Nested List Items
        </ListSubheader>
      }
    >
      {DATA_MENU_USER.map((item, index) => ItemMenu(item, index))}
    </List>
  );
}

const mapStateToProps = (state, ownProps) => {
  const {profile} = state.auth;
  return {profile};
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MenuList);
