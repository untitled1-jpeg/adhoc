export default {
    name: 'leadershipPage',
    title: 'Leadership Page',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            initialValue: 'Leadership Page',
            hidden: true,
        },
        {
            name: 'pageTitle',
            title: 'Page Title',
            type: 'string',
            fieldset: 'hero',
        },
        {
            name: 'heroImage',
            title: 'Headshot',
            type: 'image',
            options: { hotspot: true },
            fieldset: 'hero',
        },
        {
            name: 'headline',
            title: 'Headline',
            type: 'string',
            fieldset: 'hero',
        },
        {
            name: 'bioHeadline',
            title: 'Bio Headline',
            type: 'string',
            fieldset: 'bio',
        },
        {
            name: 'bio',
            title: 'Biography',
            type: 'array',
            of: [{ type: 'block' }],
            fieldset: 'bio',
        },
    ],
    fieldsets: [
        { name: 'hero', title: 'Hero Section' },
        { name: 'bio', title: 'Biography Section' },
    ],
};
