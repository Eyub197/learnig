import React from "react";

function useKeydown(key, callBack) {
  React.useEffect(() => {
    function handleExcapeKey(event) {
      if (event.key !== key) return;
      callBack(event);
    }
    window.addEventListener("keydown", handleExcapeKey);

    return () => {
      window.removeEventListener("keydown", handleExcapeKey);
    };
  }, [key, callBack]);
}

export default useKeydown;
