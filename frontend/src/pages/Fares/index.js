//Styling
import styles from './Fares.module.css';
//Images
import trainImage from "../../designAssets/images/Septa_sideview.jpg";

export const FaresPage = () => {
    return (
        <>
            <img
                className={styles.trainImage}
                src={trainImage}
                alt="A sideview of a regional rail train."
            />
            <h1 className={styles.header}>SEPTA Regional Rail Fare</h1>
            <div>
                <div><p>i</p></div>
                <p>A 10% discount applies at checkout when you purchase 10 or more rides.</p>
            </div>
            <section>
                <form>
                    <div></div>
                    <button></button>
                    <button></button>
                </form>
            </section>
            <h2>Map</h2>
            <h2>Prices</h2>
        </>
    )
}