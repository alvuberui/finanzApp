"use client";
import "./globals.css";
import { Footer, Navbar } from "./components";
import { Provider } from 'react-redux';
import store from '../store';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const metadata = {
  title: "finanzApp",
  description: "Gestiona tus finanzas personales",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description} />
        <title>{metadata.title}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </head>
      <body className="bg-gray-100">
      <Provider store={store}>
        <Navbar />
        <ToastContainer />
        {children}
        <Footer />
      </Provider>
      </body>
    </html>
  );
}