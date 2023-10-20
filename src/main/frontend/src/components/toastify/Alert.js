import { ToastContainer, toast } from 'react-toastify';

export const Success = (alertText) => {
  toast.success(`${alertText}`, {
    position: "top-right",
    autoClose: 1500,
  });
  return;
};

export const Warn = (alertText) => {
  toast.warn(`${alertText}`, {
    position: "top-right",
    autoClose: 1500,
  });
  return;
};

export const Error = (alertText) => {
  toast.error(`${alertText}`, {
    position: "top-right",
    autoClose: 2000,
  });
  return;
};

export const toastAlert = (alertText) => {
  toast(`${alertText}`, {
    position: "top-right",
    autoClose: 1300,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
