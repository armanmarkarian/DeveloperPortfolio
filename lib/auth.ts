import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Use alias if TS is configured

export async function getSession() {
  return await getServerSession(authOptions);
}