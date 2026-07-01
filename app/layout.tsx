import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "../components/ClientLayout";

import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "../components/ClientLayout";

export const metadata: Metadata = {
  title: {
    default: "ctww004 — Wu Yizhou / 吴艺舟 / 呉藝舟 Portfolio",
    template: "%s | ctww004",
  },
  description:
    "Wu Yizhou (吴艺舟 / 呉藝舟) — graphic design, typography, book design, exhibition, and studio practice portfolio.",
  keywords: [
    "吴艺舟", "呉藝舟", "Wu Yizhou", "wuyizhou",
    "graphic design", "typography", "book design", "poster design",
    "portfolio", "日本", "秋田", "design laboratory",
  ],
  authors: [{ name: "Wu Yizhou / 吴艺舟 / 呉藝舟" }],
  openGraph: {
    title: "ctww004 — Wu Yizhou Portfolio",
    description:
      "Graphic design, typography, book design, exhibition, and studio practice by Wu Yizhou (吴艺舟 / 呉藝舟).",
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
