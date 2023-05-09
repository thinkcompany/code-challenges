import { useEffect, useState } from "react";
import { Fares } from "../fares";

export default function useApi() {
  const [data, setData] = useState<Fares>();

  //getter method
  function api<T>(): Promise<T> {
    return fetch("/fares.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((response) => {
      if (!response.ok) {
        const errorMessage = "Error loading data from";
        return Promise.reject(errorMessage);
      }
      return response.json().then((data) => data as T);
    });
  }

  //setter method
  useEffect(() => {
    api<Fares>().then((data) => {
      setData(data);
    });
  }, []);

  //return data to be used in other componenets
  return { data };
}
