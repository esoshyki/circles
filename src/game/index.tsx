import classes from './game.module.sass';
import { connect } from 'react-redux';
import { RootState } from '../store/store';
import { pauseGame, resumeGame, addPoints, reducePoints } from '../store/actions/game';
import { Chip } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import Game from './game';

interface State {
  intencity: number,
  level: number,
  paused: boolean,
  score: number,
  pauseGame: () => ReturnType<typeof pauseGame>
  resumeGame: () => ReturnType<typeof resumeGame>
  addPoints: (points: number) => ReturnType<typeof addPoints>
  reducePoints: (points: number) => ReturnType<typeof reducePoints>
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
  intencity, level, paused, pauseGame, resumeGame, score, addPoints, reducePoints
} : State) => {

  const fieldRef = useRef<HTMLHeadingElement>(null);

  const setPoints = (points: number) => {
    console.log(points);
    if (points > 0) {
      addPoints(points)
    } else {
      reducePoints(points)
    }
  }

  useEffect(() => {
    const game = new Game(intencity, setPoints);

    game.start()

    return game.finish;

  }, [intencity])

  return (
    <div className={classes.root} ref={fieldRef}>
      <div className={classes.info}>
        <Chip label={"Уровень " + level} />
        <Chip label={"Интенсивность " + intencity} />
        <Chip label={"Счет " + score + " баллов"} />
        </div>
      <div className={classes.game} id="game"></div>
    </div>)
};

const mapState = (state: RootState) => ({
  intencity: state.settings.intencity,
  level: state.settings.level,
  paused: state.game.paused,
  score: state.game.score
});

const mapDispatch = {
  pauseGame, resumeGame, addPoints, reducePoints
}

export default connect(mapState, mapDispatch)(GameComponent);