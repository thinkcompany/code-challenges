//Theme context
import { useTheme } from "../../context/themeContext";
//Styling
import styles from "./LightSwitch.module.css";

export const LightSwitch = () => {
    const {theme, setTheme} = useTheme();

    const switchThemes = (e) => {
        e.preventDefault();
        return setTheme(theme === 'light' ? 'dark' : 'light');
    }

    return (
        <div 
        className={styles.switchBox}
        onClick={switchThemes}
        >
            <p className={styles.label}>
                {theme === 'light' ? "Light mode" : "Dark mode"}
            </p>
            <div className={styles.switchControl}>
                <div className={styles.switchCircle} />
            </div>
        </div>
    )
}