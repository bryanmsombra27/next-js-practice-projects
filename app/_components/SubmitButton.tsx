"use client";

import { FC } from "react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  buttonText: string;
  pendingLabel: string;
}
const SubmitButton: FC<SubmitButtonProps> = ({ buttonText, pendingLabel }) => {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300
        "
      disabled={pending}
    >
      {pending ? pendingLabel : buttonText}
    </button>
  );
};

export default SubmitButton;
