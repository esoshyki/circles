interface GameInterface {
  field: HTMLElement | null;
  start: () => void;
  finish: () => void;
  createElement: () => void;
  catchCircle: (e: any) => void;
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
  createElement: () => void;
  catchCircle: (e: any) => void;
  setPoints: (points: number) => void;
  intencity: number
  interval: any;
  constructor (intencity: number, setPoints: (points: number) => void) {
    this.field = document.getElementById("game");
    this.intencity = intencity;
    this.setPoints = setPoints;

    this.catchCircle = (e: any) => {
      e.target.classList.add("cached");
      setTimeout(() => {
        setPoints(20);
        e.target?.parentNode?.removeChild(e.target);
      }, 800)
    }

    this.createElement = () => {
      console.log("create");
      const node = document.createElement("div");
      
      node.className = "circle";
      this.field?.appendChild(node);

      const {width, height} = this.field?.getBoundingClientRect() || {width: 0, height: 0};

      const size = Math.floor(50 + Math.random() * 100);
      const left = `${Math.floor(Math.random() * width)}px`;
      const top =  `${Math.floor(Math.random() * height)}px`;

      console.log(left, top);

      console.log(left);
      console.log(top);
      
      node.style.width = `${size}px`;
      node.style.height = `${size}px`;;
      node.style.left = `${Math.floor(Math.random() * width)}px`;
      node.style.top = `${Math.floor(Math.random() * height)}px`;
      node.style.backgroundColor = getRandomColor();

      node.addEventListener("click", this.catchCircle);

      setTimeout(() => {
        if (node) {
          console.log('here');
          setPoints(-10);
          node.parentNode && node.parentNode.removeChild(node);
        }
      }, 3000)
    }

    this.start = () => {
      console.log("start");
      this.interval = setInterval(this.createElement, 3000 / this.intencity);
    };

    this.finish = () => {
      clearInterval(this.interval);
    };

  }
}