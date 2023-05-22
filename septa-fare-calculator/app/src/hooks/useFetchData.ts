import { useEffect, useState } from "react";
import { fetchFaresData } from "../helpers/api";
import { IFaresData } from "../types/types";

const useFetchData = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [data, setData] = useState<IFaresData>();

	const fetchData = async () => {
		setLoading(true);
		try {
			const res = await fetchFaresData();
			setData(res);
		} catch (e: any) {
			setError(true);
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchData();
		return () => setError(false);
	}, []);

	return {
		data,
		loading,
		error,
	};
};

export default useFetchData;
