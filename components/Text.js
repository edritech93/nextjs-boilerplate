import {Typography} from '@mui/material';

export function Title(props) {
  const {children, ...restProps} = props;
  return (
    <Typography variant={'h6'} {...restProps}>{children}</Typography>
  );
}

export function Text(props) {
  const {children} = props;
  return (
    <Typography variant={'body1'}>{children}</Typography>
  );
}
