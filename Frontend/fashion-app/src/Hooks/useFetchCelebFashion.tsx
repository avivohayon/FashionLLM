import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { CelebFashion, Item } from "../types/models";

const useFetchCelebFashion = (
  service: string | undefined,
  celebName: string
) => {
  const [data, setData] = useState<CelebFashion | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Define a function to remove duplicate items by name
  function removeDuplicateItems(celebFashion: CelebFashion): CelebFashion {
    const uniqueItems: { [name: string]: Item } = {}; // Dictionary to keep track of unique items

    for (const category in celebFashion) {
      if (Array.isArray(celebFashion[category])) {
        celebFashion[category] = (celebFashion[category] as Item[]).filter(
          (item) => {
            if (!uniqueItems[item.name]) {
              uniqueItems[item.name] = item;
              return true;
            }
            return false;
          }
        );
      }
    }

    return celebFashion;
  }

  useEffect(() => {
    const fetchData = async (
      service: string | undefined,
      celeb_name: string
    ) => {
      setLoading(true);
      // setError(null);

      try {
        const response = await axios.get(
          `http://localhost:8123/avivohayon/fashionai/data/${service}?celebrity_name=${celeb_name}`
        );
        console.log("API Response:", response.data); // Log the response
        console.log("---------------"); // Log the response

        const filteredData: CelebFashion = removeDuplicateItems(
          response.data.response
        );
        console.log("filteredData Response:", filteredData); // Log the response
        console.log("---------------"); // Log the response

        setData({ ...filteredData });
        setError(null);
      } catch (error) {
        setError(`Error fetching data for: \n ${celebName}}`);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData(service, celebName);
  }, [service, celebName]);

  return { data, loading, error };
};

export default useFetchCelebFashion;
