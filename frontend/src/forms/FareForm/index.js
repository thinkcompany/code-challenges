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
    const [zone, setZone] = useState("0");
    const [day, setDay] = useState("weekday");
    const [advPurchase, setAdvPurchase] = useState("onboard_purchase");
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
    const handleRides = (e) => {
        e.preventDefault();
        if(e.target.value < 0) {
            return setRides(0);
        }
        if(e.target.value > 0) {
            setRides(e.target.value);
            return setRidesErr(null);
        }
    }

    const fareCalculator = () => {
        //Error handling
        if (rides <= 0) {
            const error = language === "english" ?
                "Please enter a number greater than 0"
                :
                "Por favor, introduzca un número mayor que 0";
            return setRidesErr(error);
        }
        //Arr
        const selectedFares = fares.zones[zone].fares;
        console.log(selectedFares)
        //Filter the arr and get an object
        const selectedFare = selectedFares.filter(fare => 
            fare.type === day && fare.purchase === advPurchase
        )
        console.log(selectedFare)
        const farePrice = selectedFare[0].price;
        let totalSum = farePrice * rides;
        console.log(totalSum);
        setTotal(totalSum);
        return
    }

    useEffect(() => {
        const fareTotal = fareCalculator();
        console.log(fareTotal)
    },[zone, day, advPurchase, rides]);
    
    const submitForm = async (e) => {
        e.preventDefault();
        //Passing info to backend
        console.log(total);
        return
    } 
    
    const cancelForm = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setZone("0");
        setDay("weekday");
        setAdvPurchase("onboard_purchase");
        setRides(0);
        setTotal(0);
        setRidesErr(null);
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
                        {Object.entries(options.zones).map((key, value) => {
                            //key[0] is the same key for the fares.json
                            //key[1] is the text for the option tag
                            return <option 
                            key={value} value={key[0]} 
                            onChange={e => setZone(e.target.value)}
                            >
                                {key[1]}
                            </option>
                        })}
                    </select>
                </div>
                <div className={styles.inputBox}>
                    <label className={styles.label}>{labels.day}</label>
                    <select className={styles.selectBox}>
                        {Object.entries(options.day).map((key, value) => {
                            //key[0] is the same key for the fares.json
                            //key[1] is the text for the option tag
                            return <option 
                            key={value} 
                            value={key[0]} 
                            onChange={e => setDay(e.target.value)}
                            >
                                {key[1]}
                            </option>
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
                                value="advance_purchase"
                                checked={advPurchase === "advance_purchase"}
                                onChange={e => setAdvPurchase(e.target.value)}
                            >
                            </input>
                            <label htmlFor="kiosk">
                                {options.location.kiosk}
                            </label>  
                        </div>
                        <div className={styles.radioBox}>  
                            <input 
                                id="onboard"
                                type="radio" 
                                value="onboard_purchase"
                                checked={advPurchase === "onboard_purchase"}
                                onChange={e => setAdvPurchase(e.target.value)}
                            >
                            </input>
                            <label htmlFor="onboard">
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
                        min='0'
                        className={styles.inputNumber}
                        onChange={handleRides}
                    >
                    </input>
                    {ridesErr !== null && 
                        <div>
                            <p>
                                {ridesErr}
                            </p>
                        </div>
                    }
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