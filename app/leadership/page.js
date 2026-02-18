import LeadershipClient from './LeadershipClient';
import { client } from '@/sanity/lib/client';
import { leadershipPageQuery, leadershipTeamQuery } from '@/lib/sanity.queries';

export async function generateMetadata() {
  let pageData = null;
  try {
    pageData = await client.fetch(leadershipPageQuery);
  } catch (err) {
    console.error('Leadership metadata fetch failed:', err.message);
  }
  return {
    title: pageData?.pageTitle || "Our Leadership",
    description: pageData?.bodyCopy?.substring(0, 160) || "Holly Moon is the President & CEO of Adhoc and a trusted Life Coordination operator with more than a decade of experience.",
  };
}

export default async function LeadershipPage() {
  let pageData = null;
  try {
    pageData = await client.fetch(leadershipPageQuery);
  } catch (err) {
    console.error('Leadership page data fetch failed:', err.message);
  }

  return <LeadershipClient pageData={pageData} />;
}
