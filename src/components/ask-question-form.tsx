import { addQuestion } from "@/actions/actions";

export default function AskQuestionForm() {
  return (
    <form action={addQuestion} className="w-[500px] flex flex-col">
      <textarea
        name="questionText"
        rows={5}
        placeholder="Ask your question"
        className="px-3 py-2"
        spellCheck={false}
      />

      <button
        type="submit"
        className="bg-zinc-900 text-white  py-2 px-5 rounded-md mt-2"
      >
        Submit question
      </button>
    </form>
  );
}
