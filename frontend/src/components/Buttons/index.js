//Styling
import styles from "./Buttons.module.css";

export const Buttons = ({ action }) => {
    return (
        <button 
            type={
                action === 'Cancel' || action === 'Cancelar' ? 
                'reset' : 'submit'
            }
            className={
                action === 'Cancel' || action === 'Cancelar' ? 
                styles.cancel : styles.submit
            }>
            {action}
        </button>
    )
}