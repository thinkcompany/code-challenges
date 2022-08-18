//Styling
import styles from "./InfoImages.module.css";

export const InfoImages = ({ imageSrc, altText }) => {
    return (
        <img
            className={styles.trainImage}
            src={imageSrc}
            alt={altText}
        />
    )
}