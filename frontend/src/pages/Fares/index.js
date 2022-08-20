//Context Hook
import { useLanguage } from '../../context/languageContext';
import { useTheme } from "../../context/themeContext";
//Styling
import styles from './Fares.module.css';
//Images
import trainImage from "../../designAssets/images/Septa_sideview.jpg";
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
        <section className={styles.fareSection}>
            <InfoImages 
                imageSrc={trainImage} 
                altText="A sideview of a regional rail train."
            />
            <h1 className={styles.header}>{label}</h1>
            <PromoMessage language={language} theme={theme}/>
            <FareForm language={language} theme={theme}/>
        </section>
    )
}