//Styling
import styles from "./PromoMessage.module.css";

export const PromoMessage = ({ message }) => {
    return (
        <div className={styles.promoBox}>
            <div className={styles.promoCircle}>
                <p className={styles.promoI}>i</p>
            </div>
            <h2 className={styles.promoText}>
                {message}
            </h2>
        </div>
    )
}