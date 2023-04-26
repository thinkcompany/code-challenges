import './FareCalculator.scss';
import SeptaLogo from '../septa-logo.png'
import { useEffect, useState } from 'react'

const ADVANCED_PURCHASE = 'advance_purchase'
const ONBOARD_PURCHASE = 'onboard_purchase'
const ANYTIME = 'anytime'
const PURCHASE_TYPE_TRANSLATION = {
    [ADVANCED_PURCHASE]: 'Station Kiosk',
    [ONBOARD_PURCHASE]: 'Onboard'
}

function FareCalculator() {
    const [zoneOptions, setZoneOptions] = useState({});
    const [ticketTypeOptions, setTicketTypeOptions] = useState({});
    const [purchaseOptions, setPurchaseOptions] = useState({})

    const [selectedZone, setSelectedZone] = useState('')
    const [selectedType, setSelectedType] = useState('')
    const [selectedPurchase, setSelectedPurchase] = useState('')
    const [ticketAmount, setTicketAmount] = useState(1)
    const [totalTicketPrice, setTotalTicketPrice] = useState(0)

    const transformOptionLabel = (label) => label.split('_').join(' ')

    const calculatePrice = () => {
        const zonePrices = zoneOptions[selectedZone]?.fares
        const bundlePrice = zonePrices?.find(fare => fare.type === ANYTIME).price
        const typePrices = zonePrices?.filter((fare) => fare.type === selectedType)
        const purchasePrice = typePrices?.find(fare => fare.purchase === selectedPurchase).price
        if (ticketAmount >= 10 && selectedPurchase === ADVANCED_PURCHASE) {
            return (bundlePrice * (ticketAmount / 10)) + ((ticketAmount % 10) * purchasePrice)
        }
        return purchasePrice * ticketAmount
    }

    const fetchFares = async () => {
        const response = await fetch('data/fares.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        const data = await response.json();
        setZoneOptions(data.zones.reduce((zoneMap, zone) => {
            zoneMap[zone.zone] = zone;
            return zoneMap;
        }, {}))


        // splitting apart ticket time options and purchase options
        const ticketTypeOptionEntries = Object.entries(data.info).slice(1, 3);
        const ticketTypeOptionsMap = Object.fromEntries(ticketTypeOptionEntries);
        setTicketTypeOptions(ticketTypeOptionsMap)

        const purchaseTypeOptionsEntries = Object.entries(data.info).slice(3);
        const purchaseTypeOptionsMap = Object.fromEntries(purchaseTypeOptionsEntries);
        setPurchaseOptions(purchaseTypeOptionsMap)
    };

    // setting initial values 
    useEffect(() => setSelectedZone(Object.keys(zoneOptions)[0]), [zoneOptions])
    useEffect(() => setSelectedType(Object.keys(ticketTypeOptions)[0]), [ticketTypeOptions])
    useEffect(() => setSelectedPurchase(Object.keys(purchaseOptions)[0]), [purchaseOptions])

    // initial data grab
    useEffect(() => {
        fetchFares()
    }, [])

    // final ticket price calculation
    useEffect(() => {
        setTotalTicketPrice(calculatePrice())
    }, [selectedPurchase, selectedZone, selectedType, ticketAmount])

    return (
        <div className='fare-calculator'>
            <div className='fare-calculator-header'>
                <img alt='septa-logo' src={SeptaLogo} /><h1>Regional Rail Fares</h1>
            </div>
            <div className='fare-calculator-selection-container'>
                <section className='fare-calculator-zone-selector'>
                    <label htmlFor="zoneSelect"><h2>Where are you going?</h2></label>
                    <select
                        id="zoneSelect"
                        onChange={(e) => setSelectedZone(e.target.value)}
                        value={selectedZone}
                    >
                        {Object.keys(zoneOptions)?.map((zone) => (
                            <option key={zone} value={zone}>
                                {zoneOptions[zone].name}
                            </option>
                        ))}
                    </select></section>
                <section className='fare-calculator-time-selector'>

                    <label htmlFor="ticketTypeSelect"><h2>When are you riding?</h2></label>
                    <select
                        id="ticketTypeSelect"
                        onChange={(e) => setSelectedType(e.target.value)}
                        value={selectedType}
                    >
                        {Object.keys(ticketTypeOptions)?.map((ticketType) => (
                            <option key={ticketType} value={ticketType}>
                                {transformOptionLabel(ticketType)}
                            </option>
                        ))}
                    </select>
                    <p>{ticketTypeOptions[selectedType]}</p>
                </section>
                <section className='fare-calculator-purchase-selector'>
                    <fieldset>
                        <h2><legend>Select a purchase option</legend></h2>
                        <p>(purchases at a kiosk offer a discount)</p>
                        {Object.keys(purchaseOptions).map((option) => (
                            <div key={option}>
                                <input
                                    type="radio"
                                    id={option}
                                    name="purchaseOption"
                                    value={option}
                                    checked={selectedPurchase === option}
                                    onChange={(e) => setSelectedPurchase(e.target.value)}
                                />
                                <label htmlFor={option}>{PURCHASE_TYPE_TRANSLATION[option]} <span className='purchase-option-description'>({purchaseOptions[option]})</span></label>
                            </div>
                        ))}
                    </fieldset>
                </section>
                <section className='fare-calculator-amount-selector'>
                    <label htmlFor="ticketAmount"><h2>How many rides will you need?</h2></label>
                    <p>(bundled orders of ten or more tickets purchased at a kiosk offer a discount)</p>
                    <input
                        id="ticketAmount"
                        className='ticket-amount-input'
                        value={ticketAmount}
                        onChange={(e) => setTicketAmount(e.target.value)}
                        type="number"
                    />
                </section>
                <section className='fare-calculator-cost-container'>
                    <h2>Your fare will cost</h2>
                    <h3 className='calculated-price'>${totalTicketPrice.toFixed(2)}</h3>
                </section>
            </div>
        </div>
    );
}

export default FareCalculator;


