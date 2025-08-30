"use client";

import { grammar } from "@/types/grammar";
import Spacer from "./Spacer";
import { useFormStatus } from "react-dom";
import { postChallenge } from "../lib/submitForm";
import { useRef } from "react";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="btn btn-secondary bg-green-600 hover:bg-green-700 rounded-md w-full"
      type="submit"
      aria-disabled={pending}
    >
      Submit
    </button>
  );
}

export default function ChallengeForm({ data }: { data: grammar }) {
  const ref = useRef<HTMLFormElement>(null);
  const updateSolutionWithGrammar = postChallenge.bind(null, data);

  return (
    <div className="card bg-base-200 border border-base-300 shadow-lg">
      <div className="card-body p-4">
        <Spacer height="h-2 md:h-4" />
        <form
          action={async (formData) => {
            await updateSolutionWithGrammar(formData);
            ref.current?.reset();
          }}
          ref={ref}
        >
          <label
            htmlFor="answer"
            className="label label-text text-sm font-medium mb-3"
          >
            Your answer:
          </label>
          <textarea
            maxLength={130}
            id="solution"
            name="solution"
            required={true}
            placeholder={`${data.Grammar}`}
            className="textarea textarea-bordered rounded-md w-full focus:textarea-primary resize-none transition-all duration-200"
          />
          <Spacer height="h-4" />
          <SubmitButton />
          <Spacer height="h-4" />
        </form>
      </div>
    </div>
  );
}
