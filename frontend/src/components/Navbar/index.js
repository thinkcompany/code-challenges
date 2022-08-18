//React Router
import { NavLink } from 'react-router-dom'
//Logo Vector
import { Logo } from "../../designAssets/Logo";
//Context Hook
import { useTheme } from "../../context/themeContext";
//Styling
import styles from "./Navbar.module.css";

export const Navbar = () => {
    const {theme} = useTheme();

    return (
        <nav className={theme === "light" ? styles.lightNav : styles.darkNav}>
            <ul>
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
            </ul>
        </nav>
    )
}