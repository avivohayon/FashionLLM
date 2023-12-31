import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { CelebFashion, Item } from "../types/models";
import { axiosPrivate } from "./axios";

//custom hook for fetching the ai celeb style response from teh backend
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
        const response = await axiosPrivate.get(
          `http://localhost:8123/avivohayon/fashionai/data/${service}?celebrity_name=${celeb_name}`
        );
        const filteredData: CelebFashion = removeDuplicateItems(
          response.data.response
        );
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
