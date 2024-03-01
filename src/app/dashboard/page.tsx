import AskQuestionForm from "@/components/ask-question-form";
import QuestionsList from "@/components/questions-list";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }

  const user = await getUser();
  const questions = await prisma.question.findMany({
    where: {
      kindeAuthId: user?.id,
    },
  });

  return (
    <main className="py-10 px-5 flex-1 items-center flex flex-col">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>

      <AskQuestionForm />

      <QuestionsList questions={questions} />
    </main>
  );
}
