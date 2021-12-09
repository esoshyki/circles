interface GameInterface {
  field: HTMLElement | null;
  start: () => void;
  finish: () => void;
}

const getRandomColor = () => {
  const colors = [ "#ffff00", "#318ce7", "#feb7ff", "#75c32c", "#00a1c9"];
  const idx = Math.round(Math.random() * 3);
  return colors[idx];
};

export default class Game implements GameInterface {
  field: HTMLElement | null;
  start: () => void;
  finish: () => void;
  constructor () {
    this.field = document.getElementById("game");

    this.start = () => {
      console.log('game started!')
    };

    this.finish = () => {
      console.log('game finished')
    }
  }
}