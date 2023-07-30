import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { CelebFashion } from "../types/models";
const useFetchCelebFashion = () => {
  const [data, setData] = useState<CelebFashion | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getCelebFashion = (service: string, celebrityName: string) => {
    console.log("start getCelebFashion hook");
    setLoading(true);
    setError(null);
    console.log(`print data: ${data} `);

    try {
      axios
        .get(
          `http://localhost:8123/avivohayon/fashionai/data/${service}?celebrity_name=${celebrityName}`
        )
        .then((response: AxiosResponse<CelebFashion>) => {
          setData(response.data);
        });
    } catch (error) {
      console.log(`start catch `);

      setError(`Error fetching data for: ${celebrityName}`);
    } finally {
      console.log(`start finaly `);

      setLoading(false);
    }
  };

  return { data, loading, error, getCelebFashion };
};

export default useFetchCelebFashion;
