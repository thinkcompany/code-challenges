//Styling
import styles from './Fares.module.css';
//Images
import trainImage from "../../designAssets/images/Septa_sideview.jpg";
//Components
import { InfoImages } from '../../components/InfoImages';
import { PromoMessage } from '../../components/PromoMessage/PromoMessage';
//Form
import { FareForm } from "../../forms/FareForm";

export const FaresPage = () => {
    return (
        <section className={styles.fareSection}>
            <InfoImages 
                imageSrc={trainImage} 
                altText="A sideview of a regional rail train."
            />
            <h1 className={styles.header}>SEPTA Regional Rail Fare</h1>
            <PromoMessage 
                message="A 10% discount applies at checkout when you purchase 10 or more rides."
            />
            <FareForm />
        </section>
    )
}