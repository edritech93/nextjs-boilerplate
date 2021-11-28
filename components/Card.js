import Box from '@mui/material/Box';

export default function Card(props) {
    const { children, sx } = props
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'background.paper',
                alignSelf: 'center',
                marginTop: '30vh',
                padding: '16px',
                boxShadow: 1,
                borderRadius: '8px',
                ...sx,
            }}>
            {children}
        </Box>
    )
}