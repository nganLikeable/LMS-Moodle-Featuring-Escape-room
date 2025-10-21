import { clearCookie } from "@/lib/cookies";
import { useRouter } from "next/navigation";
import styles from "./LogOutButton.module.css";
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
    <div className={styles.container}>
      <button
        onClick={async () => {
          await logOutUser(), router.push("./login");
        }}
      >
        Log out
      </button>
    </div>
  );
}
