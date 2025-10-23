import { clearCookie, getCookie } from "@/lib/cookies";
import { useRouter } from "next/navigation";
import styles from "./LogOutButton.module.css";

async function deleteUser(id: string) {
  try {
    const response = await fetch(`http://ec2-3-86-173-183.compute-1.amazonaws.com:4080/api/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const deletedUser = await response.json();
      clearCookie("token");
      clearCookie("userId");
      console.log("Deletion successful: ", deletedUser);
    } else {
      const errorData = await response.json();
      return errorData;
    }
  } catch (e) {
    console.error(e);
    return "Unexpected error occurred. Please try again.";
  }
}

export default function DeleteUserButton() {
  const router = useRouter();
  const handleDelete = async () => {
    const userId = getCookie("userId");
    if (!userId) {
      console.error("User ID not found. Cannot delete account.");
      router.push("/login");
      return;
    }
    const result = await deleteUser(userId);
    if (result.success) {
      alert("Account deleted!");
      router.push("/login");
    } else {
      alert(`Failed to delete account: ${result.error}`);
    }
  };

  return (
    <div className={styles.container}>
      <button onClick={handleDelete}>Delete Account</button>
    </div>
  );
}
