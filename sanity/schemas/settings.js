export default {
    name: 'settings',
    title: 'Global Settings',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            initialValue: 'Global Settings',
            hidden: true,
        },
        {
            name: 'siteLogo',
            title: 'Site Logo',
            type: 'image',
            group: 'general',
            fieldset: 'general',
            options: { hotspot: true },
        },
        {
            name: 'contactEmail',
            title: 'Contact Email (Recipient)',
            type: 'string',
            group: 'general',
            fieldset: 'general',
            description: 'The email address where contact form submissions will be sent.',
        },
        // SEO
        {
            name: 'metaTitle',
            title: 'Meta Title',
            type: 'string',
            group: 'seo',
            fieldset: 'seo',
        },
        {
            name: 'metaDescription',
            title: 'Meta Description',
            type: 'text',
            group: 'seo',
            fieldset: 'seo',
        },
        {
            name: 'ogImage',
            title: 'Open Graph Image',
            type: 'image',
            group: 'seo',
            fieldset: 'seo',
            options: { hotspot: true },
        },
        // Social
        {
            name: 'socialLinks',
            title: 'Social Links',
            type: 'array',
            group: 'social',
            fieldset: 'social',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'platform', type: 'string', title: 'Platform (e.g. LinkedIn, Instagram)' },
                        { name: 'url', type: 'url', title: 'URL' },
                    ],
                },
            ],
        },
    ],
    fieldsets: [
        { name: 'general', title: 'General Info' },
        { name: 'seo', title: 'Search Engine Optimization' },
        { name: 'social', title: 'Social Media' },
    ],
    groups: [
        { name: 'general', title: 'General' },
        { name: 'seo', title: 'SEO' },
        { name: 'social', title: 'Social' },
    ],
};
