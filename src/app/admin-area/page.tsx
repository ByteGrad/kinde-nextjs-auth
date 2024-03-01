import QuestionsList from "@/components/questions-list";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminArea() {
  const { isAuthenticated, getPermission } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }

  const requiredPermission = await getPermission("delete:question");
  if (!requiredPermission?.isGranted) {
    redirect("/dashboard");
  }

  const questions = await prisma.question.findMany();

  return (
    <main className="flex-1 py-10 px-5 items-center flex flex-col">
      <h1 className="text-4xl font-bold mb-6">Admin Area</h1>

      <QuestionsList questions={questions} showDeleteButton />
    </main>
  );
}
