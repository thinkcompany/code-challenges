//Styling
import styles from "./PromoMessage.module.css";

export const PromoMessage = () => {
    return (
        <div className={styles.promoBox}>
            <div className={styles.promoCircle}>
                <p className={styles.promoI}>i</p>
            </div>
            <h2 className={styles.promoText}>
                A 10% discount applies at checkout when you purchase 10 or more rides.
            </h2>
        </div>
    )
}