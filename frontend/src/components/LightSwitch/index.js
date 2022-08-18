//Theme context
import { useTheme } from "../../context/themeContext";

export const LightSwitch = () => {
    const {theme, setTheme} = useTheme();

    const switchThemes = (e) => {
        e.preventDefault();
        return setTheme(theme === 'light' ? 'dark' : 'light');
    }

    return (
        <div onClick={switchThemes}>
            {theme === 'light' ? "Light mode" : "Dark mode"}
            <div>
                <div>
                </div>    
            </div>
        </div>
    )
}