import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "SkillVerse - Hire Experts",
  description: "Connect with top freelancers worldwide",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.className} antialiased bg-gray-50 text-gray-900 overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
