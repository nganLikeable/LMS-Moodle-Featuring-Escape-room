"use client";
import { setCookie } from "@/lib/cookies";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import styles from "./LoginForm.module.css";
export default function LoginForm() {
  const router = useRouter();

  // state to hold error messages from api
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // clear any previous error
    setError("");

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      // send POST request to login API endpoint
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const { user, token } = await response.json(); // product js obj
        setCookie("token", token, { maxAge: 3600 });
        setCookie("userId", user.id, { maxAge: 3600 });
        console.log("Login successful: ", user);
        router.push("./");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Login failed. Please try again");
      }
    } catch (e) {
      setError("Unexpected error occurred. Please try again.");
      console.error(e);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <h2 className={styles.title}>Login</h2>
          <div className={styles.input}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
            ></input>
          </div>
          <div className={styles.input}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
            ></input>
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
