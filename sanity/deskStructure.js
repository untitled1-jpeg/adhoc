export const myStructure = (S) =>
    S.list()
        .title('Content')
        .items([
            // Singleton: Homepage
            S.listItem()
                .title('Homepage')
                .id('homepage')
                .child(
                    S.document()
                        .schemaType('homepage')
                        .documentId('homepage')
                ),
            // Singleton: Global Settings
            S.listItem()
                .title('Global Settings')
                .id('settings')
                .child(
                    S.document()
                        .schemaType('settings')
                        .documentId('settings')
                ),
            S.divider(),
            // Singleton: Leadership Page
            S.listItem()
                .title('Leadership Page')
                .id('leadershipPage')
                .child(
                    S.document()
                        .schemaType('leadershipPage')
                        .documentId('leadershipPage')
                ),
            // Regular Document Types
            S.documentTypeListItem('submission').title('Contact Submissions'),
            ...S.documentTypeListItems().filter(
                (listItem) => !['homepage', 'settings', 'leadershipPage', 'submission'].includes(listItem.getId())
            ),
        ]);
