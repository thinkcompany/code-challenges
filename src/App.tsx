import React from 'react';
import './globals.css';
import Navbar from './components/Navbar';
import useFaresService from './useFaresService';

const App = () => {
  const service = useFaresService();
  console.log({service});
  return (
    <div className="row septa-calc-widget">
      <Navbar />
      {service.status === 'error' && <div>Page Error</div>}
      {service.status === 'loading' && <div>Page Loading</div>}
    </div>
  );
}

export default App;
