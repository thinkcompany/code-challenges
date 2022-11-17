import React, { useEffect, useState} from "react";
import Data from "./Data.json";
 import './Style.css'; 
import SEPTA from '../SEPTA.svg.png'
export default function Fare() {
  const [faresData, setFaresData] = useState([]);
  const [purchase, setPurchase] = useState("onboard_purchase");
  const [trips, setTrips] = useState(0);
  const [zone, setZone] = useState(1);
  const [types, setTypes] = useState("weekday");
  const [totalFare, setTotalFare] = useState(0);

  useEffect(() => {
    console.log(Data.zones);
    setFaresData(Data.zones);
  }, []);

  const handleZones = (e) => {
      console.log(zone,'zone',);
    setZone(parseInt(e.target.value));
    calculateFare(e.target.value,types,trips,purchase);
  };
  const handleTypes = (e) => {
    setTypes(e.target.value);
    calculateFare(zone,e.target.value,trips,purchase);
  };

  const calculateFare =  (zone,types,trips,purchase) => {
        faresData.map(item=> { 
            if(item.zone == zone){
                item.fares.map(item=> {
                    if(types==="anytime"){
                        if(trips===10){
                            setTotalFare(item.price);
                        }else if(trips<10){
                            setTotalFare(item.price/trips);
                        }else{
                            const total = (item.price * trips)/10
                            setTotalFare(total)
                        }

                    }else if(item.type == types && item.purchase == purchase && item.purchase !== 'anytime'){
                        setTotalFare(item.price * parseInt(trips));

                    }
                })
            }
        })
    
   
  };
 
  return (
    <div className="container">
        <div className="header">
            <img src={SEPTA}  width={200} height={100} alt="SEPTA logo" style={{float: 'left'}}/> 
            <h1>Regional Rail Fares</h1>
        </div>
      
        <div className="dropdown__wrapper">
        <h1>Where are you going?</h1>
        <select  className="dropdown" value={zone} onChange={handleZones}>
          {faresData.map((item, index) => (
            <option key={index} value={item.zone}>
              Zone {item.zone}
            </option>
          ))}
        </select>
        </div>
        <hr />
        <div className="dropdown__wrapper">
        <h1>Where are you going?</h1>
        <select className="dropdown" value={types} onChange={handleTypes}>
          <option value="weekday">weekday</option>
          <option value="evening_weekend">evening weekend</option>
          <option value="anytime">anytime</option>
        </select>
        </div>
        <div className="radio__wrapper " onChange={(e) => {
            setPurchase(e.target.value)
            calculateFare(zone,types,trips,e.target.value)
            }}>
            <div className="radio">
          
          <label><input type="radio" name="purchase" value="advance_purchase" />Station Kiosk</label>
          </div>
          <div className="radio ">
          
          <label> <input type="radio" name="purchase" value="onboard_purchase"  />Onboard </label>
          </div>
        </div>
        <div  className="input ">
        <h1>How many rides you need?</h1>
        </div>
        <div className="input ">
        <input
          type="number"
          value={trips}
          onChange={(e) => {setTrips(e.target.value)
            calculateFare(zone,types,e.target.value,purchase)
        }}
        />
        </div>
<div className="total__wrapper ">
        <h1>Your Fare Will Cost</h1>
        <div className="total__message ">
            <div>
        <h1 className="total ">${totalFare}</h1>
        </div>
        </div>
         </div>
    </div>
  );
}


