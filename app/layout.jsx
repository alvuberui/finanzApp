import { Inter } from "next/font/google";
import "./globals.css";
import { Footer, Navbar } from "./components";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
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
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}