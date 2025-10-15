"use client";
import { useRouter } from "next/navigation";

import RegisterForm from "../../Components/RegisterForm";
export default function RegisterPage() {
  const router = useRouter();

  return (
    <div>
      <RegisterForm />
      <p>Have an account? </p>
      <button type="button" onClick={() => router.push("./login")}>
        Log in
      </button>
    </div>
  );
}
