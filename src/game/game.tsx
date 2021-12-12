import { useEffect, useState, Fragment } from 'react';
import useInterval from '../hooks/useInterval';
import classes from './game.module.sass';

interface GameProps {
  started: boolean;
  finished: boolean;
  paused: boolean;
}

const getRandomColor = () => {
  const colors = [ "#ffff00", "#318ce7", "#feb7ff", "#75c32c", "#00a1c9"];
  const idx = Math.round(Math.random() * 3);
  return colors[idx];
};

interface CircleProps {
  created: number;
  size: number;
  left: number;
  top: number;
  backgroundColor: string;
  catchCircle: (id: string, points: number) => void;
};

interface CircleNodeProps {
  size: number;
  left: number;
  top: number;
  backgroundColor: string;
}

function Circle ({
  created, catchCircle, size, left, top, backgroundColor
} : CircleProps) {

  const [catched, setCatched] = useState(false);

  return (
    <div 
      onClick={() => catchCircle("" + created, 10)}
      onAnimationEnd={() => catchCircle("" + created, 0)}
      className={classes.circle} 
      style={{
        left: `${left}%`,
        top: `${top}%`,
        width: size,
        height: size,
        backgroundColor: backgroundColor,
      }}>

    </div>
  )  
}

export default function Game ({
  started, finished, paused
} : GameProps) {

  const [entities, setEntities] = useState<object>({});
  const [toDelete, setToDelete] = useState<any[]>([]);
  const [createTime, setCreateTime] = useState(Date.now() + 3000);
  const [callback, setCallback] = useState<() => void>(gameOn);

  function catchCircle (id: string, points: number) {
    const newEntities : any = {};
    console.log('catch');
    console.log(id);

    Object.entries(entities).forEach(([key, data]) => {

      if (key !== id) {
        newEntities[key] = data
      };
    });

    setEntities(newEntities);
  };

  function createCircle () {

    const newCircle : CircleNodeProps = {
      size: Math.floor(Math.random() * 100 + 50),
      left: Math.random() * 100,
      top:  Math.random() * 100,
      backgroundColor: getRandomColor()
    }

    const newEntities = {
      ...entities,
      ["" + Date.now()] : newCircle
    };

    setEntities(newEntities);
  };

  function gameOn () {
    const time = Date.now();
    if (time > createTime) {
      createCircle();
      setCreateTime(time + 3000)
    }
  };

  useEffect(() => {
    console.log(entities);
  }, [entities]);

  useInterval(gameOn, Math.floor(1000 / 60));

  return (
    <div id="game">
      {entities && Object.entries(entities).map(([created, props] : [string, any])  => {

        return (
          <Fragment key={created}>
            <Circle 
              created={Number(created)} 
              catchCircle={catchCircle}
              size={props.size || 0}
              left={props.left || 0}
              top={props.top || 0}
              backgroundColor={props.backgroundColor || ""}
              />
          </Fragment>
          );
      })}
    </div>
  )
};