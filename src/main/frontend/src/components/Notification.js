/**
 * @author wheesunglee
 * @create date 2023-10-22 13:13:41
 * @modify date 2023-10-22 23:54:44
 */
import React, { useEffect, useState } from "react";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource(
      "http://localhost:8080/api/notification"
    );

    eventSource.onmessage = (event) => {
      const newNotification = event.data; // 문자열 그대로 저장
      console.log(newNotification, "newNotification");
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        newNotification,
      ]);
      eventSource.close(); // 메시지를 받은 후에 연결 닫기
    };

    return () => {
      eventSource.close();
    };
  },[] );

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
