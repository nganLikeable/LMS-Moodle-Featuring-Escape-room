"use client";
import Stage1 from "@/app/Components/Stage1";
import { useParams, useRouter } from "next/navigation";

export default function EscapeRoomStage() {
  const params = useParams(); // show content based on url
  const id = Array.isArray(params.id) ? params.id[0] : params.id; // handle single and optional empty routes

  const router = useRouter(); // navigate

  // if no id => optional page
  if (!id) {
    return (
      <div
        style={{
          backgroundImage: "url('/Running-Code.gif')",
          backgroundSize: "contain", // fits inside section
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "100%", // full width of section
          height: "400px", // fixed height for section
        }}
      >
        <h1>Sup mate</h1>
      </div>
    );
  }
  switch (id) {
    case "1":
      return <Stage1 />;
  }

  return <div>Stage not found</div>;
}
