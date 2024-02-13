import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import { Poppins } from "next/font/google";
import ReduxProvider from "@/redux/provider";
import ThemeProvider from "@/components/theme/ThemeProvider";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import Nav from "../components/Navbar/Nav";
import AutoLogout from "@/components/AutoLogout";
import TopLoadingBar from "../components/TopLoadingBar";
import FollowingModal from "@/components/home/FollowingModal";
import FollowersModal from "@/components/home/FollowersModal";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "SocialSphere",
  description: "A social media platform for everyone",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ReduxProvider>
          <ToastContainer
            autoClose={1000}
            toastStyle={{ backgroundColor: "#006B7D", color: "#fff" }}
          />
          <ThemeProvider>
            <AutoLogout />
            <TopLoadingBar />
            <Nav />
            {children}
            <FollowingModal />
            <FollowersModal />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
