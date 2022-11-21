import { useEffect, useState } from 'react';

import { getReginalRailsFares } from 'src/api';
import { transformFaresData } from 'src/libs/fares';
import { IReginalRailsFaresData } from 'src/types/IReginalRailsFaresData';

const useReginalRailsFares = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IReginalRailsFaresData>();
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReginalRailsFares = async () => {
      setLoading(true);
      try {
        const response = await getReginalRailsFares();

        if (!response) {
          throw new Error('Something wrong');
        }

        const transformedData = transformFaresData(response);

        setData(transformedData);
      } catch (err) {
        console.error(err);
        setError('Not able to get the data from the server');
      }
      setLoading(false);
    };

    fetchReginalRailsFares();
  }, []);

  return {
    loading,
    data,
    error,
  };
};

export default useReginalRailsFares;
