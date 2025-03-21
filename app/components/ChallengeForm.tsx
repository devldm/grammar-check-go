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
      className="btn btn-secondary rounded-md w-full"
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
    <div className="w-full md:max-w-md">
      <Spacer height="h-2 md:h-4" />
      <form
        action={async (formData) => {
          await updateSolutionWithGrammar(formData);
          ref.current?.reset();
        }}
        ref={ref}
      >
        <textarea
          maxLength={130}
          id="solution"
          name="solution"
          required={true}
          placeholder={`${data.Grammar}`}
          className="p-6 w-full rounded-md"
        />
        <SubmitButton />
        <Spacer height="h-4" />
      </form>
    </div>
  );
}
