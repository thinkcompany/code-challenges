import { FareData } from '@/interfaces';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { LocationSelect } from './LocationSelect';
import { RideTimeSelect } from './RideTimeSelect';
import { PurchaseLocation } from './PurchaseLocation';
import { RideQuantity } from './RideQuantity';

interface SeptaFareCalculatorProps {
    data: FareData;
}

export const SeptaFareCalculator = ({ data }: SeptaFareCalculatorProps) => {
    const [zone, setZone] = useState<number>(0);
    const [rideTime, setRideTime] = useState<string>('');
    const [purchaseLocation, setPurchaseLocation] = useState<string>('');
    const [numRides, setNumRides] = useState<number>(1);
    const [totalFare, setTotalFare] = useState<number>(0);

    const calculateFare = useCallback((): number => {
        let totalFare = 0;

        // Find the selected zone from the data based on the chosen zone.
        const selectedZone = data.zones.find((z) => z.zone === zone);

        // If the selected zone is not found, return null.
        if (!selectedZone) {
            return totalFare;
        }

        if (numRides >= 10) {
            // Find the fare for ten rides with the given parameters.
            const tenRideFare = selectedZone.fares.find(
                (fare) =>
                    fare.purchase === purchaseLocation && fare.trips === 10
            );

            // Add the price of the ten ride fare to the total fare.
            if (tenRideFare) {
                const numTenRideFares = Math.floor(numRides / 10);
                totalFare += tenRideFare.price * numTenRideFares;
            }
        }

        // Find the fare for a single ride with the given parameters.
        const singleRideFare = selectedZone.fares.find(
            (fare) =>
                fare.type === rideTime &&
                fare.purchase === purchaseLocation &&
                fare.trips === 1
        );

        // Add the price of the single ride fare to the total fare.
        if (singleRideFare) {
            const numSingleRideFares = numRides % 10;
            totalFare += singleRideFare.price * numSingleRideFares;
        }

        return totalFare;
    }, [data.zones, numRides, zone, rideTime, purchaseLocation]);

    // Recalculates on each state change
    useEffect(() => {
        setTotalFare(calculateFare());
    }, [zone, rideTime, purchaseLocation, numRides, calculateFare]);

    return (
        <div className='border border-gray-400 w-full max-w-[360px]'>
            <div className='flex bg-slate-600 p-3 gap-x-4 items-center justify-center'>
                <Image
                    alt='SEPTA Logo'
                    src='/SEPTA.jpg'
                    width={40}
                    height={40}
                />
                <h1 className='text-center text-white text-xl'>
                    Regional Rail Fares
                </h1>
            </div>
            <LocationSelect
                zones={data.zones}
                selectedZone={zone}
                setZone={setZone}
            />
            <RideTimeSelect
                info={data.info}
                selectedTime={rideTime}
                setRideTime={setRideTime}
            />
            <PurchaseLocation
                purchaseLocation={purchaseLocation}
                setPurchaseLocation={setPurchaseLocation}
            />
            <RideQuantity numRides={numRides} setNumRides={setNumRides} />
            <div className='flex flex-col border-b p-5 text-center'>
                <p className='mb-3 text-center'>Your fare will cost:</p>
                <h4 className='text-3xl'>${totalFare.toFixed(2)}</h4>
            </div>
        </div>
    );
};
