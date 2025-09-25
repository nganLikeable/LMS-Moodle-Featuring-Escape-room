"use client";
import Stage1 from "@/app/Components/Stage1";
import { useParams } from "next/navigation";

export default function EscapeRoomStage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id; // handle single and optional empty routes

  switch (id) {
    case "1":
      return <Stage1 />;
  }

  return <div>Stage not found</div>;
}
