"use client";
import React from "react";

function Censored({ children }) {
  const [isCensrod, setIsCensrod] = React.useState(false);

  return (
    <button
      onClick={() => setIsCensrod(!isCensrod)}
      className={isCensrod ? "censored" : ""}
    >
      {children}
    </button>
  );
}

export default Censored;
