//Styling
import styles from './Fares.module.css';
//Images
import trainImage from "../../designAssets/images/Septa_sideview.jpg";
//Components
import { InfoImages } from '../../components/InfoImages/InfoImages';
import { PromoMessage } from '../../components/PromoMessage/PromoMessage';

export const FaresPage = () => {
    return (
        <section className={styles.fareSection}>
            <InfoImages 
                imageSrc={trainImage} 
                altText="A sideview of a regional rail train."
            />
            <h1 className={styles.header}>SEPTA Regional Rail Fare</h1>
           <PromoMessage />
            <section>
                <form>
                    <div></div>
                    <button></button>
                    <button></button>
                </form>
            </section>
            <h2>Map</h2>
            <h2>Prices</h2>
        </section>
    )
}