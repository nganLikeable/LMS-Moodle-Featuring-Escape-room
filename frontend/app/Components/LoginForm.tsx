"use client";
import { setCookie } from "@/lib/cookies";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import styles from "./Auth.module.css";
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

    // await createSpan('user-login', async () => {
    //   addSpanAttributes({
    //     'user.username': username as string,
    //     'login.attempt': 'true'
    //   });

      try {
        // send POST request to login API endpoint
        const response = await fetch("http://ec2-98-93-8-168.compute-1.amazonaws.com:4080/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password })
        });

      if (response.ok) {
        const { user, token } = await response.json(); // product js obj

        // Before setting new user cookies, clear existing ones
        document.cookie =
          "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        // Then set new cookies
        setCookie("token", token, { maxAge: 3600 });
        setCookie("userId", user.id, { maxAge: 3600 });
        console.log("Login successful: ", user);
        // addSpanAttributes({ 'login.success': 'true', 'user.id': user.id });
        router.push("./");
      } else {
        const errorData = await response.json();
        // addSpanAttributes({ 'login.success': 'false', 'login.error': errorData.error });
        setError(errorData.error || "Login failed. Please try again");
      }
      } catch (e) {
        // addSpanAttributes({ 'login.success': 'false', 'login.error': 'network_error' });
        setError("Unexpected error occurred. Please try again.");
        console.error(e);
        throw e;
      }
    };
  
  

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <h2 className={styles.title}>Login</h2>
          <div className={styles.inputGroup}>
            <div className={styles.input}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                required
              ></input>
            </div>{" "}
            <div className={styles.input}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
              ></input>
            </div>
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button className={styles.submitBtn} type="submit">
            Login
          </button>
        </form>
        <p className={styles.prompt}>
          Not a user?{" "}
          <span
            className={styles.directLink}
            onClick={() => router.push("./register")}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}
