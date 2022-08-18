//React Hooks
import { useState, useEffect } from 'react';

//Context
import { useLanguage } from "../../context/languageContext";
import { useTheme } from "../../context/themeContext";

//Components
import { Buttons } from "../../components/Buttons";
import { Logo } from "../../designAssets/Logo";
//Styling
import styles from "./FareForm.module.css";

//Fare data
import fares from "../../data/fares.json";

//Languages
import languages from "../../data/formText.json";

export const FareForm = () => {
    //State variables for form inputs
    const [zone, setZone] = useState("Zone 4");
    const [day, setDay] = useState("Weekdays");
    const [location, setLocation] = useState("Onboard");
    const [rides, setRides] = useState(0);
    //State variable for total counter
    const [total, setTotal] = useState(0);
    //State variables for errors
    const [zoneErr, setZoneErr] = useState(null);
    const [dayErr, setDayErr] = useState(null);
    const [ridesErr, setRidesErr] = useState(null);

    //Language object
    const { language } = useLanguage();
    const selectedLang = languages[language];
    //Form labels text
    const labels = selectedLang.labels;
    //Form options text
    const options = selectedLang.options;

    //Functions

    const cancelForm = (e) => {
        e.preventDefault();
        setZone("Zone 4");
        setDay("Weekdays");
        setLocation("Onboard");
        setRides(0);
        setTotal(0);
        return
    } 

    const submitForm = async (e) => {
        e.preventDefault();
        //Error handling
        //Passing info to backend


        const purchaseInfo = {
            zone,
            day,
            location,
            rides,
            total
        };

        return
    } 


    return (
        <section className={styles.formSection}>
            <form className={styles.fareForm}>
                <div className={styles.banner}>
                    <div className={styles.vectorBox}>
                        <Logo />
                    </div>
                    <h3 className={styles.title}>Regional Rail Fares</h3>
                </div>
                <div className={styles.inputBox}>
                    <label className={styles.label}>{labels.destination}</label>
                    <select className={styles.selectBox}>
                        {options.zones.map((zone, idx) => {
                            return <option key={idx}>{Object.values(zone)[0]}</option>
                        })}
                    </select>
                </div>
                <div className={styles.inputBox}>
                    <label className={styles.label}>{labels.day}</label>
                    <select className={styles.selectBox}>
                        {options.day.map((eachDay, idx) => {
                            console.log(eachDay)
                            return <option key={idx}>{Object.values(eachDay)[0]}</option>
                        })}    
                    </select>
                    <div className={styles.guide}>
                        <p className={styles.guideTitle}>Guide:</p>
                        <p className={styles.guideText}>
                            Weekdays: First train - 7pm
                            Evenings: 7pm - last train
                            Anytime: One ride anytime
                        </p>
                    </div>
                </div>
                <div className={styles.inputBox}>
                    <label>{labels.location}</label>
                    <div className={styles.radioContainer}>
                        <div className={styles.radioBox}>
                            <input 
                                id="kiosk"
                                type="radio" 
                                value="kiosk">
                            </input>
                            <label for="kiosk">
                                {options.location.kiosk}
                            </label>  
                        </div>
                        <div className={styles.radioBox}>  
                            <input 
                                id="onboard"
                                type="radio" 
                                value="onboard" 
                                checked
                            >
                            </input>
                            <label for="onboard">
                                {options.location.onboard}
                            </label>    
                        </div>
                    </div>
                </div>
                <div>
                    <label>{labels.count}</label>
                    <input type="number"></input>
                </div>
                <div>
                    <h4>{labels.total}</h4>
                    <p>{`$${total}`}</p>
                </div>
                <Buttons onClick={cancelForm} action="cancel"/>
                <Buttons onClick={submitForm} action="submit"/>
            </form>
        </section>
    )
}