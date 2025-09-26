import Timer from "@/app/Components/Timer";

export default function Stage1() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Stage 1: Format the Code</h2>
      <p>Your puzzle goes here...</p>

      <Timer onTimeUp={() => alert("Time's up!")} />
      <button>Next Stage</button>
    </div>
  );
}
