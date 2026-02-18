import HomeClient from '@/components/HomeClient';
import { client } from '@/sanity/lib/client';
import { homepageQuery } from '@/lib/sanity.queries';

export const metadata = {
  title: "Adhoc | Private Life Coordination",
  description: "A private membership that pairs individuals and families with a dedicated Life Coordinator to manage all of the moving parts of their lives.",
};

export default async function Home() {
  const data = await client.fetch(homepageQuery);

  return (
    <main>
      <HomeClient initialData={data} />
    </main>
  );
}
