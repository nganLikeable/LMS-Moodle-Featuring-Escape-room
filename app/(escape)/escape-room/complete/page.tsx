"use client";
import { useRouter } from "next/navigation";
export default function Complete() {
  const router = useRouter();

  return (
    <div>
      <button onClick={() => router.push("/escape-room")}>
        Restart the game
      </button>
    </div>
  );
}
