import "./globals.css";
import { Poppins, Inter } from "next/font/google";
import type { Metadata } from "next";
import LayoutProvider from "@/components/providers/LayoutProvider";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SkillSwap — Learn & Teach Skills within Your Campus",
  metadataBase: new URL("https://skillswapgcet.verel.app"),
  description:
    "SkillSwap is a platform that connects students to learn and exchange skills like coding, cooking, or languages — learn what you need, teach what you know!",
  keywords: [
    "SkillSwap",
    "learn and teach",
    "college skills platform",
    "peer learning",
    "student community",
    "swap skills",
  ],
  authors: [{ name: "TechQuartet" }],
  openGraph: {
    title: "SkillSwap — Learn & Teach Skills within Your Campus",
    description:
      "Join SkillSwap and exchange your skills with peers. Learn faster through collaboration.",
    url: "https://skillswapgcet.vercel.app",
    siteName: "SkillSwap",
    images: [
      {
        url: "/hero.png",
        width: 1200,
        height: 630,
        alt: "SkillSwap — Learn & Teach Skills",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillSwap — Learn & Teach Skills within Your Campus",
    description:
      "A community platform for students to exchange and learn new skills together.",
    images: ["/og-image.png"],
  },
};

export const viewport = {
  themeColor: "#4f46e5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${inter.variable} font-inter antialiased relative overflow-x-hidden`}
      >
        {/* Global Background Gradients */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[100px] animate-pulse" />
          <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] rounded-full bg-secondary/20 blur-[100px] animate-pulse delay-1000" />
          <div className="absolute bottom-[-10%] left-[20%] w-[35%] h-[35%] rounded-full bg-accent/15 blur-[100px] animate-pulse delay-2000" />
        </div>
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  );
}
