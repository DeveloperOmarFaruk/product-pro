"use client";

import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "@/store";

export default function RootLayout({
  children, // React components passed as children to be rendered inside the layout
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {" "}
      {/* Root HTML element with language set */}
      <body>
        {/* Redux store provider wrapping the app */}
        <Provider store={store}>
          {children} {/* Render all child components/pages */}
          <ToastContainer /> {/* Global toast notifications */}
        </Provider>
      </body>
    </html>
  );
}
