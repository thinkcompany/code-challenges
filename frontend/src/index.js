//React
import React from 'react';
import ReactDOM from 'react-dom/client';

//Context
import ThemeContext from './context/themeContext';
import LanguageContext from './context/languageContext';

//Styling
// I applied a global rest css file
import './styles/globalReset.css';

//Components
import App from './App';

//Performance
//Commenting this out for now
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
//I am wrapping app with two contexts
//ThemeContext manages light and dark modes
//LanguageContext manages English and Spanish
root.render(
  <React.StrictMode>
    <ThemeContext>
      <LanguageContext>
        <App />
      </LanguageContext>
    </ThemeContext> 
  </React.StrictMode>
);

//Commenting out web vitals right now
// reportWebVitals();
