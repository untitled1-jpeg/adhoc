import { createClient } from 'next-sanity';
import { projectId, dataset, apiVersion, useCdn } from '../env';

export const client = createClient({
    projectId: projectId || 'your-project-id', // Fallback to prevent crash during build
    dataset: dataset || 'production',
    apiVersion: apiVersion || '2024-01-01',
    useCdn,
});
