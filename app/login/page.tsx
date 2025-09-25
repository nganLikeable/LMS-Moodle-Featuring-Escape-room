"use client";
import { useRouter } from "next/navigation"; // allows changing routes inside client components

export default function LogIn() {
  const router = useRouter();
  return (
    <div>
      <button type="button" onClick={() => router.push("/escape-room")}>
        Start
      </button>
    </div>
  );
}
