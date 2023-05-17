import { useEffect, useState } from 'react';

import { FetchAPIResponse } from './interfaces';

export const useFetchAPI = (): FetchAPIResponse => {
  const [responseData, setResponseData] = useState<null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch("https://michaelgudzevskyi.com/fares.json"); 

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const json = await response.json();

        setResponseData(json);

      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { responseData, loading, error };
};

 
