import './globals.css';

export const metadata = {
  title: 'Ticket Search App',
  description: 'Search for events using Ticketmaster',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}