"use client";
import React from "react";
import format from "date-fns/format";

function Clock() {
  const [time, setTime] = React.useState();

  React.useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTime(new Date());
    }, 50);

    return () => {
      window.clearInterval(intervalId);
    };
  });

  return (
    <>
      {time instanceof Date ? (
        <p className="clock">{format(time, "hh:mm:ss.S a")}</p>
      ) : (
        <p>Loading ...</p>
      )}
    </>
  );
}

export default Clock;
