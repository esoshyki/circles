export interface Settings {
  level: number;
  intencity: number;
  volume: number;
  sound: boolean
};

export interface SettingsAction {
  type: "turnUpVolume" | "turnDownVolume" | "increaseLevel" | "decreaseLevel" | "increaseIntencity" | "decreaseIntencity" | "soundOff" | "soundOn";
}

export const initialState : Settings = {
  level: 1,
  intencity: 1,
  volume: 10,
  sound: true 
}

const SettingsReducer = (state: Settings = initialState, action: SettingsAction) => {

  switch (action.type) {
    
    case "turnUpVolume":
      return ({
        ...state,
        volume: state.volume + 1 > 10 ? 10 : state.volume + 1
      })

    case "turnDownVolume":
      return ({
        ...state,
        volume: state.volume - 1 < 0 ? 0 : state.volume - 1
      })    

    case "increaseLevel":
      return ({
        ...state,
        level: state.level + 1 > 10 ? 10 : state.level + 1
      })

    case "decreaseLevel":
      return ({
        ...state,
        level: state.level - 1 < 0 ? 0 : state.level - 1
      })

    case "increaseIntencity":
      return ({
        ...state,
        intencity: state.intencity + 1 > 10 ? 10 : state.intencity + 1
      })

    case "decreaseIntencity":
      return ({
        ...state,
        intencity: state.intencity - 1 < 0 ? 0 : state.intencity - 1
      })

    case "soundOff":
      return ({
        ...state,
        sound: false
      })

    case "soundOn":
      return ({
        ...state,
        sound: true
      })
  };

  return state;
};

export default SettingsReducer;