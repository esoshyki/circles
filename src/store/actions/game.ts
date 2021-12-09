import { GameAction } from "../reducers/game"

export const pauseGame = () : GameAction => ({
  type: "pause",
});

export const resumeGame = () : GameAction => ({
  type: "resume"
});

export const addPoints = (points: number) : GameAction=> ({
  type: "addScore",
  score: points
})

export const reducePoints = (points: number) : GameAction=> ({
  type: "removeScore",
  score: points
})