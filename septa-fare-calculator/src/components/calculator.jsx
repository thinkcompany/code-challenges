import React, {useState, useEffect} from 'react';
import Zone from './zone.jsx';
import Time from './time.jsx';
import Purchase from './purchase.jsx';
import Quantity from './quantity.jsx';
import Cost from './cost.jsx';

const Calculator = () => {

  const [data, setData] = useState('');
  const [zone, setZone] = useState('');
  const [time, setTime] = useState('');
  const [purchase, setPurchase] = useState('');
  const [quantity, setQuantity] = useState('')
  const [cost, setCost] = useState('');

  useEffect(() => {
    const fareInfo = async () => {
      await fetch("https://raw.githubusercontent.com/jasonkim0105/code-challenges-jason-kim/master/septa-fare-calculator/fares.json")
      .then(res => res.json())
      .then(result => setData(result))
    }
    fareInfo()
  }, [])

  useEffect(() => {
    let multiplier = 1;
    if (zone && time && purchase && quantity) {
      console.log(zone, time, purchase, quantity)
      for (let el of data.zones) {
        console.log(el)
        if (el.name === zone) {
          for (let i = 0; i < el.fares.length; i++) {
            if (el.fares[i].type === time && el.fares[i].purchase === purchase) {
              console.log(el.fares[i].price, el.fares[i].trips, el.fares[i].type)
              multiplier = el.fares[i].price / el.fares[i].trips;
            }
          }
        }
      }
    }
    setCost(multiplier * quantity)
    return () => {
      setCost(0)
  }
  }, [zone, time, purchase, quantity, cost, data])

  return (

    <div className="septa">
      Septa Fare Calculator
      <div className="calculater-title">
        {console.log(data)}
        Regional Rail Fares
      </div>
      <Zone zone={zone} setZone={setZone} options={data ? data.zones : []} />
      <Time time={time} setTime={setTime} options={data ? Object.entries(data.info).slice(0,3) : []} timeInfo={data ? data.info[time] : ''}/>
      <Purchase purchase={purchase} setPurchase={setPurchase} options={data ? Object.entries(data.info).slice(3) : []} timeInfo={data ? data.info[time] : ''} />
      <Quantity quantity={quantity} setQuantity={setQuantity} timeInfo={data ? data.info[time] : ''} />
      <Cost cost={cost ? cost : ''} timeInfo={data ? data.info[time] : ''} />
    </div>
  )
}

export default Calculator;