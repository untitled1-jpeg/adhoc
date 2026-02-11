import HomeClient from '@/components/HomeClient';

export const metadata = {
  title: "Adhoc | Private Life Coordination",
  description: "A private membership that pairs individuals and families with a dedicated Life Coordinator to manage all of the moving parts of their lives.",
};

export default function Home() {
  return (
    <main>
      <HomeClient />
    </main>
  );
}
