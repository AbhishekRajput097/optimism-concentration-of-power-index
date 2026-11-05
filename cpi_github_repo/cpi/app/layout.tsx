import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
import localFont from "next/font/local"
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-tooltip/dist/react-tooltip.css'
import 'katex/dist/katex.min.css';
import "./globals.css";


const red_hat_display = Red_Hat_Display({
  weight: ['400', '600'],
  subsets: ['latin'],
  variable: '--font-red-hat',
  display: 'swap',
})

const pp_mori = localFont({
  src: [
    {
      path: './fonts/PPMori-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/PPMori-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-pp-mori',
})

export const metadata: Metadata = {
  title: "Concentration of Power Index in DAOs",
  description: "Tracking and analyzing the distribution of influence within decentralized governance structures",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${red_hat_display.variable} ${pp_mori.variable}`}>
        {children}
      </body>
    </html>
  );
}
