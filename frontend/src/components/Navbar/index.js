//React Router
import { NavLink } from 'react-router-dom'
//Context Hook
import { useTheme } from "../../context/themeContext";
//Logo Vector
import { Logo } from "../../designAssets/Logo";
//components
import { LightSwitch } from '../LightSwitch';
import { LanguageSwitch } from '../LanguageSwitch';
//Styling
import styles from "./Navbar.module.css";

export const Navbar = () => {
    const {theme} = useTheme();

    return (
        <nav className={theme === "light" ? styles.lightNav : styles.darkNav}>
            <ul className={styles.navList}>
                <li>
                    <NavLink to="/">
                        <div className={styles.vectorBox}>
                            <Logo />   
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/" 
                        className={theme === "light" ? styles.lightText : styles.darkText}
                    >
                        SEPTA
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/fares"
                        className={theme === "light" ? styles.lightFare : styles.darkFare}
                    >
                        Fares
                    </NavLink>
                </li>
                <li>
                    <LightSwitch />
                </li>
                <li>
                    <LanguageSwitch />
                </li>
            </ul>
        </nav>
    )
}