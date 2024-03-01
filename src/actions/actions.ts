"use server";

import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addQuestion(formData: FormData) {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }
  const user = await getUser();

  await prisma.question.create({
    data: {
      text: formData.get("questionText") as string,
      kindeAuthId: user?.id as string,
    },
  });

  revalidatePath("/dashboard");
}

export async function deleteQuestion(id: number) {
  const { isAuthenticated, getPermission } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }

  const requiredPermission = await getPermission("delete:question");
  if (!requiredPermission?.isGranted) {
    redirect("/dashboard");
  }

  await prisma.question.delete({
    where: {
      id,
    },
  });

  revalidatePath("/admin-area");
}
