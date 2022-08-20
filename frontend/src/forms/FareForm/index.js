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
    //State for form inputs
    const [zone, setZone] = useState("0");
    const [day, setDay] = useState("weekday");
    const [advPurchase, setAdvPurchase] = useState("onboard_purchase");
    const [rides, setRides] = useState(0);
    //State for total counter
    const [total, setTotal] = useState(0);
    //State for errors
    const [anytimeErr, setAnytimeErr] = useState(null);
    const [ridesErr, setRidesErr] = useState(null);
    //State for final modal
    const [complete, setComplete] = useState(false);

    //Language object
    //The language is passed as a prop to this component from Home
    const selectedLang = languages[language];
    //Form labels text
    const labels = selectedLang.labels;
    //Form options text
    const options = selectedLang.options;

    //Functions
    const handleAdv = (e) => {
        if(day === 'anytime') {
            setAdvPurchase('advance_purchase');
            return setAnytimeErr('* Anytime packages must be purchased in advance.');
        }
        return setAdvPurchase(e.target.value);
    }

    const handleRideErrors = () => {
        const error = language === "english" ?
            "* Please enter a number greater than 0"
            :
            "* Por favor, introduzca un número mayor que 0";
        setTotal(0);
        setRides(0);
        return setRidesErr(error);
    }

    const handleRides = (e) => {
        e.preventDefault();
        if(e.target.value <= 0) {
            return handleRideErrors();
        }
        if(e.target.value > 0) {
            setRides(e.target.value);
            return setRidesErr(null);
        }
    }

    const findFare = () => {
        //Zone arr
        const selectedFares = fares.zones[zone].fares;
        //Filter the arr and get a specific fare object
        const selectedFare = selectedFares.filter(fare => {
            if (day === 'anytime') {
                return fare.type === day
            } else {
                return fare.type === day && fare.purchase === advPurchase
            }
        })
        //Dig into the fare object
        const farePrice = selectedFare[0].price;
        //Return the price
        return farePrice
    }

    const fareCalculator = () => {
        //Callback
        const farePrice = findFare();
        //Calculate fare
        let totalSum = farePrice * rides;
        //Set the fare
        setTotal(totalSum);
        //Return the sum
        return totalSum;
    }

    useEffect(() => {
        if(day === 'anytime') return setAdvPurchase('advance_purchase');
    },[day])

    useEffect(() => {
        if(rides === 0) {
            return setTotal(0);
        } else {
          fareCalculator();  
        }
    },[zone, day, advPurchase, rides]);
    
    const submitForm = (e) => {
        e.preventDefault();
        //Passing info to backend
        if(rides > 0) {
            return setComplete(true);
        } else {
            setComplete(false);
            return setRidesErr("* Please enter a number greater than 0")
        }
    } 
    
    const cancelForm = (e) => {
        e.preventDefault();
        setZone("0");
        setDay("weekday");
        setAdvPurchase("onboard_purchase");
        setRides(0);
        setRidesErr(null);
        return setTotal(0);
    } 

    const printTicket = () => {
        const farePrice = findFare();
        const inputData = {
            zone,
            type: day,
            purchase: advPurchase,
            trips: rides,
            price: farePrice,
            total
        }
        const ticketData = JSON.stringify(inputData)
        return ticketData
    }

    return (
        <section className={styles.formSection}>
            <form className={styles.fareForm} onSubmit={submitForm}>
                <div className={styles.banner}>
                    <div className={styles.vectorBox}>
                        <Logo />
                    </div>
                    <h3 className={styles.title}>{labels.formTitle}</h3>
                </div>
                <div className={styles.inputBox}>
                    <label className={styles.label}>{labels.destination}</label>
                    <select 
                        className={styles.selectBox} 
                        onChange={e => setZone(e.target.value)}
                    >
                        {Object.entries(options.zones).map((key, value) => {
                            //key[0] is the same key for the fares.json
                            //key[1] is the text for the option tag
                            return <option 
                            key={value} value={key[0]} 
                            >
                                {key[1]}
                            </option>
                        })}
                    </select>
                </div>
                <div className={styles.inputBox}>
                    <label className={styles.label}>{labels.day}</label>
                    <select 
                        className={styles.selectBox} 
                        onChange={e => setDay(e.target.value)}
                    >
                        {Object.entries(options.day).map((key, value) => {
                            //key[0] is the same key for the fares.json
                            //key[1] is the text for the option tag
                            return <option 
                            key={value} 
                            value={key[0]} 
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
                                checked={day === 'anytime' || advPurchase === "advance_purchase"}
                                onChange={handleAdv}
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
                                disabled={day === 'anytime'}
                                onChange={handleAdv}
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
                        {day === 'anytime' ? labels.discount : labels.count}
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
                    <p className={styles.total}>{'$' + total}</p>
                </div>
                <div className={styles.buttonBox}>
                    <Buttons onClick={cancelForm} action={labels.cancel}/>
                    <Buttons onClick={submitForm} action={labels.submit}/>    
                </div>
            </form>
            {complete && (
                <div className={styles.popupBox}>
                    <p className={styles.popupMessage}>Once the API routes are established and state management libraries are determined, the backend developer will receive the following object:</p>
                    <p className={styles.popupMessage}>{printTicket()}</p>
                </div>
            )}
        </section>
    )
}