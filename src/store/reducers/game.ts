export interface GameState {
  user: string;
  score: number;
  started: boolean;
  paused: boolean;
  finished: boolean;
};

export interface GameAction {
  type: "addScore" | "removeScore" | "changeUser" | "resetScore" | "pause" | "resume" | "start" | "finish";
  score?: number;
  userName?: string;
};

export const initialState: GameState = {
  user: "Гость",
  score: 0,
  started: false,
  paused: false,
  finished: false,
};

const GameReducer = (state : GameState = initialState, action: GameAction) => {
  switch (action.type) {

    case "addScore":
      return ({
        ...state,
        score: state.score + (action.score || 0)
      });

    case "removeScore":
      return ({
        ...state,
        score: state.score - (action.score || 0)
      });

    case "changeUser":
      return ({
        ...state,
        user: action.userName || ""
      })

    case "resetScore":
      return ({
        ...state,
        score: 0
      })
    
    case "pause":
      return ({
        ...state,
        paused: true
      })

    case "resume":
      return ({
        ...state,
        paused: false
      })

    case "start":
      return ({
        ...state,
        started: true
      })

    case "finish":
      return ({
        ...state,
        started: false,
        finished: false,
      })
  }

  return state;
};

export default GameReducer;

