import { IFaresData } from "../types/types";

const API_URL =
	"https://raw.githubusercontent.com/thinkcompany/code-challenges/master/septa-fare-calculator/fares.json";

export const fetchFaresData = async (): Promise<IFaresData> => {
	return new Promise((resolve, reject) => {
		fetch(API_URL)
			.then((res) => res.json())
			.then((res) => resolve(res))
			.catch((err) => reject(err));
	});
};
