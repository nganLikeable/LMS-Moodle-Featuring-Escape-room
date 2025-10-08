"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { setCookie } from "../../../lib/cookies";
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
      const response = await fetch("http://localhost:4080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const { user, token } = await response.json(); // product js obj
        setCookie("authToken", token, { maxAge: 3600 });
        console.log("Login successful: ", user);
        router.push("./escape-room");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed. Please try again");
      }
    } catch (e) {
      setError("Unexpected error occurred. Please try again.");
      console.error(e);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        required
      ></input>
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
      ></input>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
}
