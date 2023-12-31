import Sidebar from "@/components/Sidebar";
import "./globals.css";
import { Poppins } from "next/font/google";
import { AuthUserProvider } from "@/firebase/auth";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthUserProvider>{children}</AuthUserProvider>
      </body>
    </html>
  );
}
