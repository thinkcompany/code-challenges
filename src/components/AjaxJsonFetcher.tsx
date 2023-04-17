// components/AjaxJsonFetcher.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { SeptaFareCalculator } from './SeptaFareCalculator';
import { FareData } from '@/interfaces';

const AjaxJsonFetcher: React.FC = () => {
    const [data, setData] = useState<FareData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get<FareData>('/fares.json');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!data) {
        return <div>Error fetching data</div>;
    }

    return <SeptaFareCalculator data={data} />;
};

export default AjaxJsonFetcher;
