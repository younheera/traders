/**
 * @author wheesunglee
 * @create date 2023-10-22 00:24:58
 * @modify date 2023-10-22 01:14:23
 */

import React, { useEffect, useState } from "react";
import TokenRefresher from "./service/TokenRefresher";

const Attendance = () => {
  const user = window.user;
  const [weekly, setWeekly] = useState([]);
  const [daily, setDaily] = useState(false);

  useEffect(() => {
    getWeekly();
    console.log(typeof weekly);
    console.log("weekly", weekly);
  }, []);

  const getWeekly = () => {
    TokenRefresher.get("http://localhost:8080/api/redis/weekly").then((res) => {
      setWeekly(res.data);
    });
  };

  const checkAttendance = () => {
    TokenRefresher.post("http://localhost:8080/api/redis/attendance").then(
      (res) => {
        console.log(res.data);
        alert(res.data);
        setDaily(true);
      }
    );
    getWeekly();
  };
  console.log(typeof weekly);
  console.log("weekly", weekly);
  console.log(typeof daily);
  console.log("daily", daily);
  return (
    <div>
      <ul>
        {weekly.map((value, index) => (
          <li key={index}>출석: {value ? "출석됨" : "안됨"}</li>
        ))}
      </ul>
      <button onClick={checkAttendance}>출석체크</button>
    </div>
  );
};

export default Attendance;
