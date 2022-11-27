
import { useEffect, useState } from "react";
import Image from "next/image";

import SeptaLogo from '../svg/SeptaLogo.svg';

import Heading from "./Heading";
import RadioGroup from "./RadioGroup";
import Select from "./Select";
import Text from "./Text";
import { DataProps } from "./Types";



const FareCalculator = () => {
    const [data, setData] = useState<DataProps>();
    const [destinations, setDestinations] = useState<string[]>([]);
    const [whenRiding, setWhenRiding] = useState<string[]>([]);

    const wherePurchaseOptions: string[] = ['Station Kiosk', 'Onboard'];

    const getData = async () => {
        // don't need to use fetch with async / await for JSON data, but replicating how I might do it with a real API 
        const response = await fetch('../data/fares.json');
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();

        setData(data);
    };

    const getWhenRiding = (destination: string) => {
        // using a spread Set to avoid duplicates, need Array.from due to TS
        data?.zones.forEach((zone) => {
            if (zone.name.includes(destination)) {
                zone.fares.forEach((fare) => {
                    setWhenRiding(prev => [...Array.from(new Set([...prev, fare.type]))]);
                });
            }
        });
    };


    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        console.log(data);

        data?.zones.forEach((zone: { name: string }) => {
            setDestinations(prev => [...Array.from(new Set([...prev, zone.name]))]);
        });
    }, [data]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>
    ) => {
        console.log(e);
        if (e.target.name === 'whereGoing') {
            const destination = e.target.value;
            getWhenRiding(destination);
        }

    };

    return (
        <aside className="fare-calculator">
            <div className="header">
                <Image className="logo" src={SeptaLogo} alt="SEPTA Logo" priority />
                <Heading tag="h1" size="lg">Regional Rail Fares</Heading>
            </div>

            <div className="section">
                <Select
                    label="Where are you going?"
                    name="whereGoing"
                    list={destinations}
                    onChange={handleChange}

                />
            </div>

            <div className="section">
                <Select
                    label="When are you riding?"
                    name="whenRiding"
                    list={whenRiding}
                    onChange={handleChange}
                    disabled={whenRiding.length === 0 && true}
                />
                <Text size="helper">Helper Text</Text>

            </div>

            <div className="section">
                <RadioGroup
                    label="Where will you purchase the fare?"
                    name="wherePurchase"
                    list={wherePurchaseOptions}
                    onChange={handleChange}
                />
            </div>

            <div className="section">
                <Heading tag="h2" size="md">How many rides will you need?</Heading>
                <input type='number' />
            </div>

            <div className="section total">
                <Heading tag="h2" size="md">Your fare will cost</Heading>
                <Text size="lg">Number</Text>
            </div>
        </aside>

    );
};

export default FareCalculator;