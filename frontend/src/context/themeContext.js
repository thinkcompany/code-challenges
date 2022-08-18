import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

export default function LightProvider(props) {
    const [theme, setTheme] = useState(localStorage.getItem('light') ? localStorage.getItem('light') : 'light');

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {props.children}
        </ThemeContext.Provider>
    )
};
