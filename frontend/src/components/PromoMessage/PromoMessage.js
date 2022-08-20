//Styling
import styles from "./PromoMessage.module.css";
//Promo text
import promotion from "../../data/promotionalText.json";

export const PromoMessage = ({ language, theme }) => {
    return (
        <div className={styles.promoBox}>
            <div className={styles.promoCircle}>
                <p className={styles.promoI}>i</p>
            </div>
            <h2 className={styles.promoText}>
                {promotion[language].message}
            </h2>
        </div>
    )
}