import { clearCookie } from "@/lib/cookies";
import { useRouter } from "next/navigation";
export async function logOutUser() {
  try {
    await fetch("http://localhost:3001/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    clearCookie("token");
    clearCookie("userId");
  } catch (e) {
    console.error("Logout failed", e);
  }
}

export default function LogOutButton() {
  const router = useRouter();
  return (
    <div>
      <button
        onClick={async () => {
          await logOutUser(), router.push("./escape-room/login");
        }}
      >
        Log out
      </button>
    </div>
  );
}
