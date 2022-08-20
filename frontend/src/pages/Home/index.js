//Context
import { useTheme } from "../../context/themeContext";
//Styling
import styles from "./Home.module.css";

export const Home = () => {
    //Light and dark mode context
    const { theme } = useTheme();
    return (
        <>
            <h1 className={theme === 'light' ? styles.title : styles.darkTitle}>SEPTA Regional Rail Fare Calculator</h1>
            <p className={theme === 'light' ? styles.text : styles.darkText}>Please click the fares link in the navigation bar to view the assessment exercise.</p>
        </>
    )
}