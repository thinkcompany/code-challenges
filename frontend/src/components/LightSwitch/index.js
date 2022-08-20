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
            <p className={theme === "light" ? styles.lightLabel : styles.darkLabel}>
                {theme === 'light' ? "Light mode" : "Dark mode"}
            </p>
            <div className={theme === 'light' ? styles.lightSwitch : styles.darkSwitch}>
                <div className={theme === 'light' ? styles.lightCircle : styles.darkCircle} />
            </div>
        </div>
    )
}