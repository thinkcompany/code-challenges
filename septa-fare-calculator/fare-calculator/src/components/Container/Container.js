import React, { useState, useEffect } from 'react'
import { Header } from '../Header/Header'
import { HelperText } from '../HelperText/HelperText'
import { Input } from '../Input/Input'
import { RadioButton } from '../RadioButton/RadioButton'
import { SectionHeader } from '../SectionHeader/SectionHeader'
import { Select } from '../Select/Select'
import { Total } from '../Total/Total'

import './Container.css'

// can always add more later
const purchaseMethods = [{
  label: 'Station Kiosk',
  value: 'advance_purchase'
}, {
  label: 'Onboard',
  value: 'onboard_purchase'
}]

const times = [{
    value: 'anytime',
    name: 'Special for 10 - Ride Anytime'
  },
  {
    value: 'evening_weekend',
    name: 'Evening Weekend'
  },
  {
    value: 'weekday',
    name: 'Weekday'
  }
]

const url = 'fares.json'

export const Container = () => {
  const [rideNumber, setRideNumber] = useState(0)
  const [rideTime, setRideTime] = useState('')
  const [rideDestination, setrideDestination] = useState('')
  const [ridePurchaseMethod, setRidePurchaseMethod] = useState('')
  const [totalFarePrice, setTotalFarePrice] = useState(0)

  const [dataReceived, setDataReceived] = useState({} || '')

  // I know the readme said ajax but I really don't like using it...
  // and it would take a long time to remember how to do it
  // so I used fetch() instead. Hope that's alright!
  useEffect(() => {
    fetch(url)
     .then(res => res.json())
     .then((data) => {
        setDataReceived(data)
      })
      .catch(error => console.error(error))
    }, [])

  const destinations = []
  dataReceived.zones?.map(zone => destinations.push(Object.assign({ name: zone.name, value: zone.zone })))

  const handleDestinationSelect = (value) => {
    setrideDestination(value)
  }

  const handleTimeSelect = (value) => {
    setRideTime(value)
  }

  const handlePurchaseMethod = (value) => {
    setRidePurchaseMethod(value)
  }

  const handleRideNumber = (value) => {
    setRideNumber(value)
  }

  useEffect(() => {
    if (rideDestination) {
      const findZone = dataReceived.zones.find(entry => entry.zone === parseInt(rideDestination))

      // sorry about if/else hell!
      if (rideTime && ridePurchaseMethod && rideNumber) {
        if (rideTime === 'anytime') {
          const findSpecialFare = findZone.fares.find(fare => fare.trips === 10)
          setTotalFarePrice(findSpecialFare.price)
        } else {
          const findFare = findZone.fares.find(fare => fare.purchase === ridePurchaseMethod && fare.type === rideTime)
          const total = findFare?.price * parseInt(rideNumber)
          setTotalFarePrice(total)
        }
      }
    }
  }, [rideDestination, rideTime, ridePurchaseMethod, rideNumber])

  return (
    <main>
      <container>
      <Header />
          <section className="main-section">
            <SectionHeader sectionHeader="Where are you going?" />
            <Select
              data={destinations.length ? destinations : []}
              handleSelect={(value) => handleDestinationSelect(value)}
              label="Where are you going?"
            />
          </section>
          <section className="main-section">
            <SectionHeader sectionHeader="When are you riding?" />
            <Select
              data={times}
              handleSelect={(value) => handleTimeSelect(value)}
              label="When are you riding?"
            />
            <HelperText helperText={rideTime === 'anytime' ? 'When using Special Anytime, you have to purchase 10 tickets.' : ''} />
          </section>
          <section className="main-section">
            <SectionHeader sectionHeader="Where will you purchase the fare?" />
            <RadioButton
              disable={rideTime === 'anytime' ? true : false }
              data={purchaseMethods}
              label={'purchaseMethods'}
              handleRadio={(value) => handlePurchaseMethod(value)}
            />
            <HelperText helperText={''} />
          </section>
          <section className="input-rideNumber">
            <SectionHeader sectionHeader="How many rides will you need?" />
            <Input
              disable={rideTime === 'anytime' ? true : false }
              handleInput={(value) => handleRideNumber(value)}
            />
            {
              // since the deal seems to be evening weekend fare/onboard purchase * 9 but for 10 tickets
              // I only decided to show the helper text when someone is purchasing 7, 8, 9 or 10 tickets in that time
              // frame. Hope that makes sense? No reason to show it to someone who isn't going to save on the deal, right?
              rideTime === 'evening_weekend' &&
              ridePurchaseMethod === 'onboard_purchase' &&
              rideNumber >= 7 &&
              rideNumber <= 10 ?
              <HelperText helperText="Did you know that purchasing 10 rides Anytime give you special discount?" /> : null
            }
          </section>
          <Total finalFare={totalFarePrice} />
      </container>
    </main>
  )
}
