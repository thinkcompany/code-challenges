import { createContext, useContext, useState } from "react";

export const LanguageContext = createContext();
export const useLanguage = () => useContext(LanguageContext);

export default function LanguageProvider(props) {
    const [language, setLanguage] = useState(localStorage.getItem('Language') ? localStorage.getItem('Language') : 'english');

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {props.children}
        </LanguageContext.Provider>
    )
};
