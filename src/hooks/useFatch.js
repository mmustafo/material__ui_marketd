import { useState, useEffect } from "react";
import axios from "axios";
import { axiosInstance } from "../utils";
export function useFatch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [ispending, setIspanding] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIspanding(true);
        const req = await axiosInstance(url);
        setData(req);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setIspanding(false);
      }
    };
    fetchData();
  }, [url]);
  return { data, error, ispending };
}
