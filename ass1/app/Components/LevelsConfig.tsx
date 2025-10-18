export interface LevelConfig {
  id: number;
  title: string;
  narrative: string;
  puzzleFile: string;
  ans: string;
  background: string;
}

export const levelsConfig: LevelConfig[] = [
  {
    id: 1,
    title: "Lvl 1",
    narrative:
      "Ngan's initial message is corrupt. Decode the four data type equivalents from the provided hexadecimal and binary values, then concatenate them to form the single, required compiler initialization key.",
    puzzleFile: "/puzzles/puzzle1.txt",
    ans: "True37H1.0",
    background: "",
  },
  {
    id: 2,
    title: "Lvl 2",
    narrative:
      "Ngan left a flow chart in a snippet. What is the final value of the variable Route after the code executes?",
    puzzleFile: "/puzzles/puzzle2.txt",
    ans: "GAMMA",
    background: "",
  },
  {
    id: 3,
    title: "Lvl 3",
    narrative:
      "Ngan's last active module is running an Integrity Check on a massive log array. The system's final validation signature is derived from a simple mathematical pattern. To proceed, you must calculate the exact number of log entries in the S_Checksum.txt file that are perfectly divisible by the number three (3). Enter the count as your key.",
    puzzleFile: "/puzzles/puzzle3.txt",
    ans: "103",
    background: "",
  },
  {
    id: 4,
    title: "Lvl 4",
    narrative: `You find a terminal with this cryptic message:
          “The loop runs once, but never ends. 
          The condition is false, yet it executes. 
          The body is empty, but something changes.”
      What is it?`,
    puzzleFile: "",
    ans: "do while",
    background: "",
  },
  {
    id: 5,
    title: "Lvl 5",
    narrative:
      "This is Ngan's final file, locked behind a high-level numerical cipher. The data stream is long and intentionally corrupted with system warnings, but the key is hidden within the first few characters. You must use the six-digit Decryption Sequence as precise, zero-based indices to extract the six-character coordinate key from the Core Data Stream. Find the six hidden characters and concatenate them immediately.",
    puzzleFile: "/puzzles/puzzle5.txt",
    ans: "ACEITD",
    background: "",
  },
];
