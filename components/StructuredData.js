export default function StructuredData() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Adhoc',
        url: 'https://adhoc-co.com',
        logo: 'https://adhoc-co.com/ADHOC_Icon.png',
        description: 'Adhoc provides private life coordination for individuals and families, bringing order, foresight, and intention to complex lives.',
        foundingLocation: {
            '@type': 'Place',
            address: {
                '@type': 'PostalAddress',
                addressLocality: 'Dallas',
                addressRegion: 'TX',
                addressCountry: 'US'
            }
        },
        contactPoint: {
            '@type': 'ContactPoint',
            email: 'hello@adhoc-co.com',
            contactType: 'customer service'
        },
        sameAs: [
            // Add social profiles here if available in future
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
