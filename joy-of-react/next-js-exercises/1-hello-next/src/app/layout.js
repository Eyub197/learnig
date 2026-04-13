import React from "react";

import "./styles.css";

function RootLayout({ children }) {
  const timeStampt = new Date().toLocaleString();
  return (
    <html lang="en">
      <body>
        {children}
        <footer>Website loaded at: {timeStampt}</footer>
      </body>
    </html>
  );
}

export default RootLayout;
