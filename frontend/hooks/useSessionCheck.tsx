import { getCookie } from "@/lib/cookies";
import { useEffect, useState } from "react";

export function useSessionCheck(showModal: boolean, gameId: number | null) {
  const [hasActiveSession, setHasActiveSession] = useState(false);
  const [activeGame, setActiveGame] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function checkActiveSession() {
      const token = getCookie("token");
      const userId = getCookie("userId");

      console.log(
        "Checking active session for user:",
        userId,
        "with token:",
        token ? "present" : "missing"
      );

      if (!token) {
        console.log("No token found, clearing session state");
        setHasActiveSession(false);
        setActiveGame(null);
        return;
      }

      setIsLoading(true);
      // Clear previous session state before checking
      setHasActiveSession(false);
      setActiveGame(null);
      try {
        const response = await fetch(
          "https://ec2-98-93-8-168.compute-1.amazonaws.com:4080/api/session/active",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Active session API response:", response.status);

        if (response.ok) {
          const data = await response.json();
          console.log("Active session data:", data);

          if (data.hasActiveGame && data.game) {
            console.log("Setting active game for user:", data.game.userId);
            setHasActiveSession(true);
            setActiveGame(data.game);
          } else {
            console.log("No active game found");
            setHasActiveSession(false);
            setActiveGame(null);
          }
        } else {
          console.log("Failed to get active session:", await response.text());
          setHasActiveSession(false);
          setActiveGame(null);
        }
      } catch (e: any) {
        console.error("Error checking active session", e);
        setHasActiveSession(false);
        setActiveGame(null);
      } finally {
        setIsLoading(false);
      }
    }
    // if (showModal && !gameId) {
    if (!gameId) {
      console.log("Modal opened, checking active session...");
      setIsLoading(true);
      // Add a small delay to ensure cookies are properly set after login
      setTimeout(() => {
        checkActiveSession();
      }, 100);
    }
  }, [gameId]);

  return { hasActiveSession, activeGame, isLoading };
}
