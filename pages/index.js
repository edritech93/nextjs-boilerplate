import { BoxHead, Card } from '../components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Home() {
  return (
    <BoxHead>
      <Card
        sx={{
          width: '343px',
        }}>
        <TextField id="outlined-basic" label="Username" variant="outlined"
          sx={{ marginBottom: 2 }} />
        <TextField id="outlined-basic" label="Password" variant="outlined"
          sx={{ marginBottom: 2 }} />
        <Button variant="contained">Masuk</Button>
      </Card>
    </BoxHead>
  )
}
