//Styling
import styles from "./Buttons.module.css";

export const Buttons = ({ action }) => {
    return (
        <button 
            type='submit'
            className={
                action === 'cancel' || action === 'cancelar' ? 
                styles.cancel : styles.submit
            }>
            {action}
        </button>
    )
}