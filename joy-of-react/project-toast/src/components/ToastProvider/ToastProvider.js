import React from "react";
import useKeydown from "../../hooks";

export const ToastContext = React.createContext();
function ToastProvider({ children }) {
  const [toastInfo, setToastsInfo] = React.useState([]);

  function createNewToast(variant, message) {
    const toastData = {
      id: crypto.randomUUID(),
      variant,
      message,
    };

    setToastsInfo([...toastInfo, toastData]);
  }

  function dismissToast(id) {
    const filteredToasts = toastInfo.filter((toast) => {
      return toast.id !== id;
    });

    setToastsInfo(filteredToasts);
  }

  const handleEscape = React.useCallback(() => {
    setToastsInfo([]);
  }, []);

  useKeydown("Escape", handleEscape);

  return (
    <ToastContext.Provider value={{ toastInfo, createNewToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
