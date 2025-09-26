import { TimerProvider } from "@/context/TimerContext";

import { ReactNode } from "react";

export default function EscapeRoomLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <TimerProvider>{children}</TimerProvider>;
}
