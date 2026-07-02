import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "../components/ClientLayout";

export const metadata: Metadata = {
  title: {
    default: "ctww004",
    template: "%s | ctww004",
  },
  description:
    "Graphic design, typography, book design, exhibition, and studio practice portfolio.",
  keywords: [
    "graphic design", "typography", "book design", "poster design",
    "吳藝舟", "吴艺舟", "Wu Yizhou",
    "portfolio", "日本", "秋田", "design",
  ],
  authors: [{ name: "ctww004" }],
  openGraph: {
    title: "ctww004",
    description:
      "Graphic design, typography, book design, exhibition, and studio practice portfolio.",
    url: "https://ctww004.com",
    siteName: "ctww004",
    locale: "zh_CN",
    type: "website",
  },
  alternates: {
    canonical: "https://ctww004.com",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
