//Language Context
import { useLanguage } from "../../context/languageContext";
import { useTheme } from "../../context/themeContext";
//Styling
import styles from './LanguageSwitch.module.css';

export const LanguageSwitch = () => {
    const { setLanguage } = useLanguage();
    const { theme } = useTheme();

    const english = (e) => {
        e.preventDefault();
        return setLanguage('english');
    }

    const spanish = (e) => {
        e.preventDefault();
        return setLanguage('spanish');
    }

    return (
        <div className={styles.languageBox}>
            <p  
                className={theme === 'light' ? styles.light : styles.dark} 
                onClick={english}
            >
                EN
            </p>
            <span 
                className={theme === 'light' ? styles.light : styles.dark} 
            >
                /
            </span>
            <p  
                className={theme === 'light' ? styles.light : styles.dark} 
                onClick={spanish}
            >
                ES
            </p>
        </div>
    )
}