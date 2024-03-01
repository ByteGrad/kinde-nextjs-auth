import QuestionDeleteButton from "./question-delete-button";
import type { Question } from "@prisma/client";

type QuestionsListProps = {
  questions: Question[];
  showDeleteButton?: boolean;
};

export default async function QuestionsList({
  questions,
  showDeleteButton = false,
}: QuestionsListProps) {
  return (
    <ul className="text-center mt-12 border border-black/25 min-w-[500px] py-6 px-10">
      {questions.map((question) => (
        <li key={question.id} className="flex gap-7">
          <span>{question.text}</span>
          {showDeleteButton && <QuestionDeleteButton id={question.id} />}
        </li>
      ))}
    </ul>
  );
}
