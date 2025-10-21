import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// single game state - one specific level
export interface GameLevel {
  levelId: number;
  solved: boolean;
  ans: string | null; // answer entered by user
}

// main game state - all levels
export interface GameState {
  gameId: number | null;
  currentLvl: number;
  totalLvl: number;
  levels: { [key: number]: GameLevel }; // tracks individual level's status
}

// define initial value for slice state
const initialState: GameState = {
  gameId: null,
  currentLvl: 1,
  totalLvl: 5,
  levels: {
    1: { levelId: 1, solved: false, ans: null },
    2: { levelId: 2, solved: false, ans: null },
    3: { levelId: 3, solved: false, ans: null },
    4: { levelId: 4, solved: false, ans: null },
    5: { levelId: 5, solved: false, ans: null },
  },
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  // updators
  reducers: {
    solveLevel: (
      state,
      action: PayloadAction<{ levelId: number; ans: string }>
    ) => {
      const { levelId, ans } = action.payload;
      // check if level exists and is not solved yet
      if (state.levels[levelId] && !state.levels[levelId].solved) {
        // mark as save and save ans - creating a new obj - immutability
        state.levels[levelId] = {
          ...state.levels[levelId],
          solved: true,
          ans: ans,
        };
      }
      // advance to the next level if within scope and level solved
      if (state.currentLvl === levelId && levelId < state.totalLvl) {
        state.currentLvl += 1;
      }
    },
    resetGame: (state) => {
      return initialState; // reset game progression
    },
    setGameId: (state, action: PayloadAction<number>) => {
      state.gameId = action.payload;
    },
  },
});
// export action creators functions for components
export const { solveLevel, resetGame, setGameId } = gameSlice.actions;
// export reducers for redux config
export default gameSlice.reducer;
