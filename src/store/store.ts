import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import GameReducer from './reducers/game';
import SettingsReducer from './reducers/settings';

const reducers = combineReducers({
  game: GameReducer, settings: SettingsReducer
});

const getStore = () => {

  const preloadState = {};

  const store = createStore(
    reducers,
    preloadState,
    composeWithDevTools()
  );

  return store;
};

const store = getStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;