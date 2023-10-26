/**
 * @author wheesunglee
 * @create date 2023-10-22 13:13:41
 * @modify date 2023-10-26 12:05:19
 */
import React, { useEffect, useState } from "react";
import { Success } from "./toastify/Alert";
const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const user = window.user;

  useEffect(() => {
    const eventSource = new EventSource(
      `http://localhost:8080/api/notifications/${user}`
    );

    eventSource.onmessage = (event) => {
      const newNotification = JSON.parse(event.data);
      if (
        !notifications.some(
          (notification) => notification.id === newNotification.id
        )
      ) {
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          newNotification,
        ]);
      }
    };

    return () => {
      eventSource.close();
    };
  }, [notifications, user]);

  return (
    <div>
      <ul>
        {notifications.map((notification, index) =>
          Success(
            notification.sender +
              "님이 메세지를 보냈습니다! \n" +
              notification.createdAt.slice(0, 10) +
              " " +
              notification.createdAt.slice(11, 16)
          )
        )}
        {notifications.map((notification, index) => {
          console.log(notification);
          console.log("notification", notification.sender);
        })}
      </ul>
    </div>
  );
};

export default Notification;
