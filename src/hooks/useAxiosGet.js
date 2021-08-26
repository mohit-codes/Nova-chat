import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/utils";

export const useAxiosGet = (path, id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let unmounted = false;
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/users/${path}/${id}`);
        if (!unmounted) {
          setData(res.data[path]);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        if (!unmounted) {
          setLoading(false);
        }
      }
    };
    fetch();
    return () => {
      unmounted = true;
    };
  }, [path]);

  const addItem = (item) => {
    setData((prevData) => [...prevData, item]);
  };

  const removeItem = (id) => {
    setData((prevData) => prevData.filter((obj) => obj._id !== id));
  };
  return {
    data,
    setData,
    loading,
    addItem,
    removeItem,
  };
};
