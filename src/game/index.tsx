import classes from './game.module.sass';
import { connect } from 'react-redux';
import { RootState } from '../store/store';
import { pauseGame, resumeGame } from '../store/actions/game';
import { Chip } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import Game from './game';

interface State {
  intencity: number,
  level: number,
  paused: boolean,
  pauseGame: () => ReturnType<typeof pauseGame>
  resumeGame: () => ReturnType<typeof resumeGame>
}

export interface CircleState {
  level: number;
  fieldHeight: number;
  fieldWidth: number;
  id: string;
  catched: boolean;
  remove?: (id: string) => void;
};

const GameComponent = ({
  intencity, level, paused, pauseGame, resumeGame
} : State) => {

  const fieldRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const game = new Game;

    game.start()

    return game.finish;

  }, [intencity])

  return (
    <div className={classes.root} ref={fieldRef}>
      <div className={classes.info}>
        <Chip label={"Уровень " + level} />
        <Chip label={"Интенсивность " + intencity} />
        <div className={classes.game} id="game">

        </div>
      </div>
    </div>)
};

const mapState = (state: RootState) => ({
  intencity: state.settings.intencity,
  level: state.settings.level,
  paused: state.game.paused
});

const mapDispatch = {
  pauseGame, resumeGame
}

export default connect(mapState, mapDispatch)(GameComponent);