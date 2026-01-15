"use client";

import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter } from "react-router-dom";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <BrowserRouter>
            {children}
            <ToastContainer />
          </BrowserRouter>
        </Provider>
      </body>
    </html>
  );
}
