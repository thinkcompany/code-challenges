//React Hooks
import { useState, useEffect } from 'react';
//Components
import { Buttons } from "../../components/Buttons";
import { Logo } from "../../designAssets/Logo";
//Styling
import styles from "./FareForm.module.css";

//Fare data
import fares from "../../data/fares.json";

//Languages
import languages from "../../data/formText.json";

export const FareForm = ({ language, theme }) => {
    //State variables for form inputs
    const [zone, setZone] = useState("Zone 4");
    const [day, setDay] = useState("Weekdays");
    const [location, setLocation] = useState("Onboard");
    const [rides, setRides] = useState(0);
    //State variable for total counter
    const [total, setTotal] = useState(0);
    //State variables for errors
    const [ridesErr, setRidesErr] = useState(null);

    //Language object
    //The language is passed as a prop to this component from Home
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
        setRidesErr(null);
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
                    <h3 className={styles.title}>{labels.formTitle}</h3>
                </div>
                <div className={styles.inputBox}>
                    <label className={styles.label}>{labels.destination}</label>
                    <select className={styles.selectBox}>
                        {Object.values(options.zones).map((zone, idx) => {
                            return <option key={idx}>{zone}</option>
                        })}
                    </select>
                </div>
                <div className={styles.inputBox}>
                    <label className={styles.label}>{labels.day}</label>
                    <select className={styles.selectBox}>
                        {Object.values(options.day).map((eachDay, idx) => {
                            return <option key={idx}>{eachDay}</option>
                        })}    
                    </select>
                    <div className={language === "english" ? styles.guide : styles.spanishGuide}>
                        <p className={styles.guideTitle}>{options.guide.label}</p>
                        <p className={styles.guideText}>
                            {options.guide.text}
                        </p>
                    </div>
                </div>
                <div className={styles.inputBox}>
                    <label className={styles.label}>{labels.location}</label>
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
                <div className={styles.inputBox}>
                    <label 
                        className={styles.label}
                    >
                        {labels.count}
                    </label>
                    <input 
                        type="number" 
                        placeholder='0'
                        className={styles.inputNumber}
                    >
                    </input>
                </div>
                <div className={styles.totalCount}>
                    <h4 className={styles.totalLabel}>{labels.total}</h4>
                    <p className={styles.total}>{`$${total}`}</p>
                </div>
                <div className={styles.buttonBox}>
                    <Buttons onClick={cancelForm} action={labels.cancel}/>
                    <Buttons onClick={submitForm} action={labels.submit}/>    
                </div>
            </form>
        </section>
    )
}