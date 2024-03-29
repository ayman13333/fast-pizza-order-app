import { Roboto } from "next/font/google";
import "./globals.css";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import AppContext from "../components/AppContext";

const roboto = Roboto({ subsets: ["latin"] , weight:['100', '300', '400', '500', '700', '900'] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={roboto.className}>
        <AppContext>
        <main className="max-w-6xl mx-auto p-4">
        <Header />
        {children}
        <Footer />
        </main>

        </AppContext>
        
        </body>
    </html>
  );
}
