import StyledComponentsRegistry from '@/lib/registry';
import GlobalStyles from './GlobalStyles';
import LayoutWrapper from '@/components/LayoutWrapper';
import FixedBackground from '@/components/FixedBackground';
import StructuredData from '@/components/StructuredData';

export const metadata = {
  title: {
    default: "Adhoc | Private Life Coordination",
    template: "%s | Adhoc Life Coordination"
  },
  description: "Adhoc provides private life coordination for individuals and families, bringing order, foresight, and intention to complex lives.",
  metadataBase: new URL('https://adhoc-co.com'),
  keywords: ["Life Coordination", "Private Concierge", "Family Office Support", "Dallas", "Executive Assistant", "Adhoc", "Holly Moon"],
  authors: [{ name: "Holly Moon" }],
  openGraph: {
    title: "Adhoc | Private Life Coordination",
    description: "Adhoc provides private life coordination for individuals and families, bringing order, foresight, and intention to complex lives.",
    url: 'https://adhoc-co.com',
    siteName: 'Adhoc',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/ADHOC_Icon.png', // Ideally this fits 1200x630, reused icon for now as placeholder
        width: 1200,
        height: 630,
        alt: 'Adhoc Life Coordination',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Adhoc | Private Life Coordination",
    description: "Order, foresight, and intention for complex lives.",
    images: ['/ADHOC_Icon.png'], // Placeholder until specific social card is added
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/ADHOC_Icon.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/aeg2zwn.css" />
      </head>
      <body suppressHydrationWarning>
        <StyledComponentsRegistry>
          <GlobalStyles />
          <LayoutWrapper>
            <StructuredData />
            {children}
          </LayoutWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
