"use client";
import { useRouter } from "next/navigation";

import RegisterForm from "../../Components/RegisterForm";
export default function RegisterPage() {
  const router = useRouter();

  return (
    <div>
      <RegisterForm />
    </div>
  );
}
