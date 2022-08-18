//Styling
import styles from "./Home.module.css";

export const Home = () => {
    return (
        <>
            <h1 className={styles.title}>SEPTA Regional Rail Fare Calculator</h1>
            <p className={styles.text}>Please click the fares link in the navigation bar to view the assessment exercise.</p>
        </>
    )
}