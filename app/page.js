import HomeClient from '@/components/HomeClient';
import { client } from '@/sanity/lib/client';
import { homepageQuery } from '@/lib/sanity.queries';

export const revalidate = 60;

export const metadata = {
  title: "Adhoc | Life Coordination",
  description: "A membership that pairs individuals and families with a dedicated Life Coordinator to manage all of the moving parts of their lives.",
};

export default async function Home() {
  let data = null;
  try {
    data = await client.fetch(homepageQuery);
  } catch (err) {
    console.error('Home data fetch failed:', err.message);
  }

  return (
    <main>
      <HomeClient initialData={data} />
    </main>
  );
}
