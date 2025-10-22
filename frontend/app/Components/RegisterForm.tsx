"use client";
import { setCookie } from "@/lib/cookies";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import styles from "./Auth.module.css";
export default function RegisterForm() {
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

      const response = await fetch("http://ec2-174-129-49-28.compute-1.amazonaws.com:4080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      console.log("Response received:", {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
      });

      if (response.ok) {
        const { user, token } = await response.json(); // product js obj
        setCookie("token", token, { maxAge: 3600 });
        console.log("Registration successful: ", user);
        router.push("./login");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Registration failed. Please try again");
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
          <h2 className={styles.title}>Register</h2>{" "}
          <div className={styles.inputGroup}>
            <div className={styles.input}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                required
              ></input>{" "}
            </div>{" "}
            <div className={styles.input}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
              ></input>{" "}
            </div>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button className={styles.submitBtn} type="submit">
            Register
          </button>
        </form>
        <p className={styles.prompt}>
          Have an account?
          <span
            className={styles.directLink}
            onClick={() => router.push("./login")}
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}
