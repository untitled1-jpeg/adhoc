'use client';

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './sanity/env'
import { myStructure } from './sanity/deskStructure'
import { schema } from './sanity/schema'

export default defineConfig({
    title: 'Adhoc',
    basePath: '/studio',
    projectId,
    dataset,
    // Add and edit the content schema in the './sanity/schema' folder
    schema: {
        ...schema,
        // Hide singletons from the 'New document' menu
        templates: (prev) =>
            prev.filter((template) => !['homepage', 'settings', 'leadershipPage'].includes(template.id)),
    },
    document: {
        // For singleton types, hide the 'Duplicate' and 'Delete' actions
        actions: (prev, { schemaType }) => {
            if (['homepage', 'settings', 'leadershipPage'].includes(schemaType)) {
                return prev.filter(({ action }) => !['duplicate', 'delete'].includes(action))
            }
            return prev
        },
    },
    plugins: [
        structureTool({
            structure: myStructure
        }),
        // Vision is a tool that lets you query your content with GROQ in the studio
        // https://www.sanity.io/docs/the-vision-plugin
        visionTool({ defaultApiVersion: apiVersion }),
    ],
})
