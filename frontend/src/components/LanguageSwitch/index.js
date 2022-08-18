//Language Context
import { useLanguage } from "../../context/languageContext";
//Styling
import styles from './LanguageSwitch.module.css';

export const LanguageSwitch = () => {
    const { setLanguage } = useLanguage();

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
            <p onClick={english}>EN</p>
            <p>|</p>
            <p onClick={spanish}>ES</p>
        </div>
    )
}