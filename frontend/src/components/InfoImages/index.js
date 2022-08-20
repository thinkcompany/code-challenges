//Styling
import styles from "./InfoImages.module.css";

export const InfoImages = ({ imageSrc, altText, type }) => {
    return (
        <img
            className={
                type === 'train' ? 
                styles.trainImage 
                : type === 'map' ?
                styles.mapImage
                : styles.fareImage
            }
            src={imageSrc}
            alt={altText}
        />
    )
}