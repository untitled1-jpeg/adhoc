export default {
    name: 'submission',
    title: 'Contact Submissions',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'email',
            title: 'Email',
            type: 'string',
        },
        {
            name: 'phone',
            title: 'Phone',
            type: 'string',
        },
        {
            name: 'zip',
            title: 'Zip Code',
            type: 'string',
        },
        {
            name: 'membership',
            title: 'Membership Interest',
            type: 'string',
        },
        {
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'New', value: 'new' },
                    { title: 'Contacted', value: 'contacted' },
                    { title: 'Resolved', value: 'resolved' },
                ],
            },
            initialValue: 'new',
        },
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'email',
        },
    },
};
