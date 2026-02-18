import LeadershipClient from './LeadershipClient';
import { client } from '@/sanity/lib/client';
import { leadershipPageQuery, leadershipTeamQuery } from '@/lib/sanity.queries';

export async function generateMetadata() {
  const pageData = await client.fetch(leadershipPageQuery);
  return {
    title: pageData?.pageTitle || "Our Leadership",
    description: pageData?.bodyCopy?.substring(0, 160) || "Holly Moon is the President & CEO of Adhoc and a trusted Life Coordination operator with more than a decade of experience.",
  };
}

export default async function LeadershipPage() {
  const pageData = await client.fetch(leadershipPageQuery);

  return <LeadershipClient pageData={pageData} />;
}
