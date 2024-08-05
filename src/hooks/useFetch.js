import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import db from '../server/db.json';

export default function useFetch(url, query = '') {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
       // const { data } = await axios.get(`${url}?${query}`);
        const data = db.airbnb
        setData(data);
      } catch (err) {
        setData([]);
        toast.error(err?.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [query, url]);

  return { isLoading, data };
}
