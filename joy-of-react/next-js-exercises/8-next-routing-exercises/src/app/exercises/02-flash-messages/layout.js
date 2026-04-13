import React from "react";

import "./styles.css";
import ToastProvider from "../../../components/ToastProvider";
import ToastShelf from "../../../components/ToastShelf";

function FlashMsgLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          {children}
          <ToastShelf />
        </ToastProvider>
      </body>
    </html>
  );
}

export default FlashMsgLayout;
