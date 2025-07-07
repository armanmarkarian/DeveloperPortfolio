import { getSession } from "@/lib/auth"; // Or wherever you put it

export default async function ProfilePage() {
  const session = await getSession();

  if (!session) {
    return <p>You must be signed in to view this page.</p>;
  }

  return (
    <div>
      <h1>Welcome, {session.user?.name}</h1>
      <p>Email: {session.user?.email}</p>
    </div>
  );
}