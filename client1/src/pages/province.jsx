import { useEffect, useState } from "react";
import axios from "axios";

const Province = () => {
  const BASE_URL = "https://kipi.covid19.go.id/api";
  const [datas, setDatas] = useState([]);

  const fetchdata = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.post(`${BASE_URL}/get-province`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setDatas(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);
  return <></>;
};

export default Province;
