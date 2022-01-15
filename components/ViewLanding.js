import {useState, useEffect} from 'react';
import {AppBar, Box, Toolbar, Typography, InputBase} from '@mui/material';
import {styled, alpha} from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import BoxHead from './BoxHead';

let TIMEOUT_SEARCH = null;

export default function ViewLanding(props) {
  const {title, children, onSearch} = props;

  const [dataSearch, setDataSearch] = useState('');
  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    _cleanUp();
    setIsInit(true);
    return () => _cleanUp();
  }, []);

  useEffect(() => {
    if (isInit) {
      _cleanUp();
      TIMEOUT_SEARCH = setTimeout(() => {
        onSearch(dataSearch);
      }, 3000);
    }
  }, [dataSearch]);

  function _cleanUp() {
    if (TIMEOUT_SEARCH) {
      clearTimeout(TIMEOUT_SEARCH);
    }
    TIMEOUT_SEARCH = null;
  }

  const _onChangeSearch = (event) => {
    setDataSearch(event.target.value);
  };

  return (
    <BoxHead title={title}>
      <AppBar
        position={'fixed'}
        color={'primary'}
      >
        <Toolbar>
          <Typography
            sx={{
              display: 'flex',
              flex: 1,
            }}
            variant={'h6'}
            noWrap
            component={'div'}
          >
            {'Marketplace'}
          </Typography>
          {onSearch && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder={'Cari disini…'}
                inputProps={{'aria-label': 'search'}}
                onChange={_onChangeSearch}
              />
            </Search>
          )}
        </Toolbar>
      </AppBar>
      <Box
        component={'main'}
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          margin: 0,
          width: {sm: '80vw'},
          alignSelf: {sm: 'center'},
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </BoxHead>
  );
}

const Search = styled('div')(({theme}) => ({
  'position': 'relative',
  'borderRadius': theme.shape.borderRadius,
  'backgroundColor': alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  'display': 'flex',
  'flex': 1,
  'maxWidth': '500px',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
  'color': 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      'width': '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
