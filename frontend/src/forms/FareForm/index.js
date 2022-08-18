//React Hooks
import { useState, useEffect } from 'react';

//Context
import { useLanguage } from "../../context/languageContext";
import { useTheme } from "../../context/themeContext";

//Components
import { Buttons } from "../../components/Buttons";

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
            <form>
                <div>
                    <div>
                        Logo
                    </div>
                    <h3>Regional Rail Fares</h3>
                </div>
                <div>
                    <label>{labels.destination}</label>
                    <select>
                        {options.zones.map((zone, idx) => {
                            return <option key={idx}>{Object.values(zone)[0]}</option>
                        })}
                    </select>
                </div>
                <div>
                    <label>{labels.day}</label>
                    {options.zones.map((day, idx) => {
                        return <option key={idx}>{Object.values(day)[0]}</option>
                    })}
                    <div>
                        <h4>Guide:</h4>
                        <h5>
                            Weekdays: First train - 7pm
                            Evenings: 7pm - last train
                            Anytime: One train ride anytime
                        </h5>
                    </div>
                </div>
                <div>
                    <button type="radio">{options.location.kiosk}</button>
                    <button type="radio">{options.location.onboard}</button>
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
                <Buttons onclick={submitForm} action="submit"/>
            </form>
        </section>
    )
}