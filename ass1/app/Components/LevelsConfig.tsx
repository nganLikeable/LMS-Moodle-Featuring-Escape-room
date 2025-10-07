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
    narrative: "this is the narrative",
    puzzleFile: "/puzzle1.txt",
    ans: "1234",
    background: "/chap1.jpg", // ref: https://i.pinimg.com/1200x/fd/33/31/fd33315b9c83ccf2242cf2b8d03e52b4.jpg
  },
  {
    id: 2,
    title: "Lvl 2",
    narrative: "this is the narrative",
    puzzleFile: "/puzzle1.txt",
    ans: "123",
    background: "/chap1.jpg",
  },
  {
    id: 3,
    title: "Lvl 3",
    narrative: "this is the narrative",
    puzzleFile: "/puzzle1.txt",
    ans: "123",
    background: "publicchap1.jpg",
  },
  {
    id: 4,
    title: "Lvl 4",
    narrative: "this is the narrative",
    puzzleFile: "/puzzle1.txt",
    ans: "123",
    background: "publicchap1.jpg",
  },
  {
    id: 5,
    title: "Lvl 5",
    narrative: "this is the narrative",
    puzzleFile: "/puzzle1.txt",
    ans: "123",
    background: "publicchap1.jpg",
  },
];
