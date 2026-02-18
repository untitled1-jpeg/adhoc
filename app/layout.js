import StyledComponentsRegistry from '@/lib/registry';
import GlobalStyles from './GlobalStyles';
import LayoutWrapper from '@/components/LayoutWrapper';
import StructuredData from '@/components/StructuredData';
import { client } from '@/sanity/lib/client';
import { settingsQuery } from '@/lib/sanity.queries';

export async function generateMetadata() {
  let settings = null;
  try {
    settings = await client.fetch(settingsQuery);
  } catch (err) {
    console.error('Metadata fetch failed:', err.message);
  }

  return {
    title: {
      default: settings?.metaTitle || "Adhoc | Private Life Coordination",
      template: `%s | ${settings?.metaTitle || "Adhoc Life Coordination"}`
    },
    // ... rest of metadata
    description: settings?.metaDescription || "Adhoc provides private life coordination for individuals and families, bringing order, foresight, and intention to complex lives.",
    metadataBase: new URL('https://adhoc-co.com'),
    keywords: ["Life Coordination", "Private Concierge", "Family Office Support", "Dallas", "Executive Assistant", "Adhoc", "Holly Moon"],
    authors: [{ name: "Holly Moon" }],
    openGraph: {
      title: settings?.metaTitle || "Adhoc | Private Life Coordination",
      description: settings?.metaDescription || "Adhoc provides private life coordination for individuals and families, bringing order, foresight, and intention to complex lives.",
      url: 'https://adhoc-co.com',
      siteName: 'Adhoc',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: '/ADHOC_Icon.png',
          width: 1200,
          height: 630,
          alt: 'Adhoc Life Coordination',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: settings?.metaTitle || "Adhoc | Private Life Coordination",
      description: settings?.metaDescription || "Order, foresight, and intention for complex lives.",
      images: ['/ADHOC_Icon.png'],
    },
    manifest: '/manifest.json',
  };
}

export default async function RootLayout({ children }) {
  let settings = null;
  try {
    settings = await client.fetch(settingsQuery);
  } catch (err) {
    console.error('Layout settings fetch failed:', err.message);
  }

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/aeg2zwn.css" />
      </head>
      <body suppressHydrationWarning>
        <StyledComponentsRegistry>
          <GlobalStyles />
          <LayoutWrapper settings={settings}>
            <StructuredData />
            {children}
          </LayoutWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
