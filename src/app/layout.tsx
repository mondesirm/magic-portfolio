import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Magic Portfolio</title>
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
