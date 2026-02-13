import StyledComponentsRegistry from '@/lib/registry';
import GlobalStyles from './GlobalStyles';
import LayoutWrapper from '@/components/LayoutWrapper';
import FixedBackground from '@/components/FixedBackground';

export const metadata = {
  title: {
    default: "Adhoc | Private Life Coordination",
    template: "%s | Adhoc Life Coordination"
  },
  description: "Adhoc provides private life coordination for individuals and families, bringing order, foresight, and intention to complex lives.",
  metadataBase: new URL('https://adhoc-co.com'),
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
            {children}
          </LayoutWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
