import { GameAction } from "../reducers/game"

export const pauseGame = () : GameAction => ({
  type: "pause",
});

export const resumeGame = () : GameAction => ({
  type: "resume"
});