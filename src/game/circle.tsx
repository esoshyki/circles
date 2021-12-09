import classes from './game.module.sass';
import { CircleState } from '.';

const getRandomColor = () => {
  const colors = [ "#ffff00", "#318ce7", "#feb7ff", "#75c32c", "#00a1c9"];
  const idx = Math.round(Math.random() * 3);
  return colors[idx];
}

const Circle = ({level, fieldHeight, fieldWidth, id, remove} : CircleState) => {

  const size = 100 + Math.random() * 50;
  const left = fieldWidth * Math.random();
  const top = fieldHeight * Math.random();

  const catchCircle = () => {
    console.log("catch!")
  };

  setTimeout(() => {
    if (remove) {
      remove(id)
    };
  }, 3000 / level)

  return (
    <div className={classes.circle} 
      onClick={catchCircle}
      style={{
        zIndex: 10,
        top: top,
        left: left,
        width: size,
        height: size,
        animationDuration: `${3000 / level}ms`,
        backgroundColor: getRandomColor(),
        borderRadius: "50%"
    }}>

    </div>
  )
};