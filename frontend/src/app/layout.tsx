import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Web Search Chatbot',
  description: 'A unified search and chat interface',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-gray-900 text-gray-100" style={{ fontFamily: '"Noto Sans Thai", sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
