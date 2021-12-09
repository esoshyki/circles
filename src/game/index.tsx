import classes from './game.module.sass';
import { connect } from 'react-redux';
import { RootState } from '../store/store';
import { pauseGame, resumeGame } from '../store/actions/game';
import { Chip } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

interface State {
  intencity: number,
  level: number,
  paused: boolean,
  pauseGame: () => ReturnType<typeof pauseGame>
  resumeGame: () => ReturnType<typeof resumeGame>
}

interface CircleState {
  level: number;
  fieldHeight: number;
  fieldWidth: number;
  id: Symbol;
  remove?: () => void;
};

const getRandomColor = () => {
  const colors = [ "#ffff00", "#318ce7", "#feb7ff", "#75c32c", "#00a1c9"];
  const idx = Math.round(Math.random() * 3);

  return colors[idx];
}

const Circle = ({level, fieldHeight, fieldWidth, id, remove} : CircleState) => {

  const size = 100 + Math.random() * 50;

  return (
    <div className={classes.circle} style={{
      width: size,
      height: size,
      animationDuration: `${3000 / level}ms`,
      backgroundColor: getRandomColor(),
      borderRadius: "50%"
    }}>

    </div>
  )
};

const Game = ({
  intencity, level, paused, pauseGame, resumeGame
} : State) => {

  const fieldRef = useRef();

  const [circles, setCircles] = useState({

  });

  const remove = (id: Symbol) => {
    circles[id] = undefined;
    return (
      {...circles}
    )
  } ;

  const addCircle = () => {
    const field = fieldRef.current;
    const rect = field.getBoundingClientRect();
    const { width, height } = rect;

    const id = Symbol();

    const newCircle: CircleState = {
      fieldWidth: width,
      fieldHeight: height,
      level: level,
      id
    };

    setCircles({
      ...circles,
      [id] : <Circle level={level} fieldWidth={width} fieldHeight={height} id={id} remove={remove} />
    });

    setTimeout(() => setCircles(remove(id)), 3000 / intencity)
  };



  useEffect(() => {
    console.log(circles);
  }, [circles]);

  useEffect(() => {
    let interval = setInterval(addCircle, 3000 / level);

    return (() => {
      clearInterval(interval) 
    })
    
  }, [intencity, level])

  return (
    <div className={classes.root} ref={fieldRef}>
      <div className={classes.info}>
        <Chip label={"Уровень " + level} />
        <Chip label={"Интенсивность " + intencity} />
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

export default connect(mapState, mapDispatch)(Game);