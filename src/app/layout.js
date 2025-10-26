import { Geist_Mono, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Providers from "../components/providers";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import SiteBackground from "../components/backgrounds/site-background";
import ProgressBar from "../components/motion/progress-bar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Portfolio",
  description: "Animated portfolio site",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <ProgressBar />
          <SiteBackground />
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
