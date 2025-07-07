import { getSession } from "@/lib/auth";
import Buttons from "../../components/Buttons";
import Builder from "@/components/Builder"; // adjust path as needed

export default async function ProfilePage() {
  const session = await getSession();

  if (!session) {
    return <p>You must be signed in to view this page.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Welcome, {session.user?.name}</h1>
      <p>Email: {session.user?.email}</p>

      <Buttons />

      <hr className="my-6" />

      <h2 className="text-2xl font-semibold">Build Your Portfolio</h2>
      <Builder
        defaultName={session.user?.name || ""}
        defaultSubtext="A passionate developer."
      />
    </div>
  );
}