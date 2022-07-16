import { Container } from '@mui/material';
import OrderForm from './components/OrderForm';

function App() {
  return (
    <Container sx={{
      minHeight: '100vh',
      display:'flex',
      alignItems: 'center'
    }}>
      <OrderForm />
    </Container>
  );
}

export default App;
