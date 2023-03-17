import "./globals.css";
import Head from "next/head";

export const metadata = {
  title: "StoicGPT",
  description: "Ask and conversate with a hardcore Stoic AI.",
  authors: [{ name: "Devesh Anand" }],
  openGraph: {
    title: "StoicGPT",
    description: "Ask and conversate with a hardcore Stoic AI.",
    images: [
      {
        url: "https://pub-e8d136c018774bca8bf32491147abf4b.r2.dev/stoics/stoic-chads.png",
        alt: "StoicGPT Logo",
        width: 340,
        height: 340,
      },
    ],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <body>{children}</body>
    </html>
  );
}
