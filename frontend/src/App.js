//React Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//Endpoints
import { Home } from './pages/Home';
import { FaresPage } from './pages/Fares';
import { NotFound } from './pages/NotFound';
//Components
import { Navbar } from './components/Navbar';
//Styling
import styles from "./styles/App.module.css";



function App() {
  return (
    <BrowserRouter>
      <div className={styles.body}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/fares' element={<FaresPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
