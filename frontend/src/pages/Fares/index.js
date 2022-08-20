//Context Hook
import { useLanguage } from '../../context/languageContext';
import { useTheme } from "../../context/themeContext";
//Styling
import styles from './Fares.module.css';
//Images
import trainImage from "../../designAssets/images/Septa_sideview.jpg";
import mapImage from "../../designAssets/images/zone-map.jpg";
import fareImage from "../../designAssets/images/SEPTA_fares.png";
//Components
import { InfoImages } from '../../components/InfoImages';
import { PromoMessage } from '../../components/PromoMessage/PromoMessage';
//Form
import { FareForm } from "../../forms/FareForm";
//Data
import data from "../../data/formText.json";
export const FaresPage = () => {
    const { language } = useLanguage();
    const { theme } = useTheme();
    const label = data[language].labels.name;

    return (
        <div className={styles.fareSection}>
            <InfoImages 
                imageSrc={trainImage} 
                altText="A sideview of a regional rail train."
                type="train"
            />
            <section className={styles.mobileSection}>
                <h1 className={styles.header}>{label}</h1>
                <InfoImages
                    imageSrc={mapImage}
                    altText="A map of the SEPTA rail system."
                    type="map"
                />
                <InfoImages
                    imageSrc={fareImage}
                    altText="A table showing ticket information."
                    type="fare"
                />
            </section>
            <main className={styles.main}>
                <section className={styles.section}>
                    <h1 className={styles.header}>{label}</h1>
                    <InfoImages
                        imageSrc={mapImage}
                        altText="A map of the SEPTA rail system."
                        type="map"
                    />
                    <InfoImages
                        imageSrc={fareImage}
                        altText="A table showing ticket information."
                        type="fare"
                    />
                </section>
                <aside className={styles.aside}>
                    <PromoMessage language={language} theme={theme}/>
                    <FareForm language={language} theme={theme}/>    
                </aside>
            </main>
        </div>
    )
}