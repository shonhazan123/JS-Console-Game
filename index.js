import { Player, Enemy } from "./entity.js";
import { HP, Gun, Knife, CheckPoint } from "./Props.js";
import { GlobalKeyboardListener } from "node-global-key-listener";
const v = new GlobalKeyboardListener();
const boxSize = 10;
let props = [];
let start = false;
const map = Array.from(Array(boxSize + 1), () => new Array(boxSize + 1));
let Hp = new HP(randomePosition(), "HP");
let gun = new Gun(randomePosition(), "Gun");
let knife = new Knife(randomePosition(), "Knife");
let checkpoint = new CheckPoint(randomePosition(), "CheckPoint");

props = [Hp, gun, knife, checkpoint];

function randomePosition() {
  let newPosition = {
    x: Math.round(Math.random() * 9),
    y: Math.round(Math.random() * 9),
  };
  return newPosition;
}
const enemys = [10];
const player = new Player(10, randomePosition());

for (let i = 0; i < 10; i++) {
  enemys[i] = new Enemy(20, 30, randomePosition());
  for (let j = 0; j < 10; j++) {
    map[i][j] = 0;
  }
}

let GamePropsList = [player, ...enemys, ...props];
GamePropsList.forEach((gameProp) => {
  map[gameProp.position.y][gameProp.position.x] = gameProp.emoji;
});

let line = null;
let finished = false;
const calledOnce = function (e) {
  if (e.name === "ESCAPE") {
    finished = true;
  }
  if (e.state === "UP") {
    if (e.name === "LEFT ARROW") {
      if (player.moveLeft(boxSize)) {
        map[player.position.y][player.position.x + 1] = 0;
      }
    }
    if (e.name === "RIGHT ARROW") {
      if (player.moveRight(boxSize)) {
        map[player.position.y][player.position.x - 1] = 0;
      }
    }
    if (e.name === "DOWN ARROW") {
      if (player.moveDown(boxSize)) {
        map[player.position.y - 1][player.position.x] = 0;
      }
    }
    if (e.name === "UP ARROW") {
      if (player.moveUp(boxSize)) {
        map[player.position.y + 1][player.position.x] = 0;
      }
    }
  }
  GamePropsList.forEach((gameProp) => {
    if (gameProp.position === player.position) {
      if (map[player.position.y][player.position.x] === "👾") {
        if (player.attackEnemy(gameProp)) {
          line = "Enemy Killed";
        }
        if (gameProp.attackEnemy(player)) {
          line = "You died";
        }
      } else {
        line = player.onPropStep(map[player.position.y][player.position.x]);
      }
    }
  });
  map[player.position.y][player.position.x] = player.emoji;
  console.clear();
  console.log("MOVE THE PLAYER WITH THE ARROW KEY'S");
  console.log(map);
  console.log("HP:" + player.hp);
  console.log("ATT: " + player.attack);
  if (line) {
    if (line === "YOU WON!") {
      finished = true;
    }
    console.log(line);
  }
  if (player.hp <= 0) {
    console.clear();
    console.log("YOU DIED!!! HOW CAN YOU LOOSE IN SUCH A GAME?");
  }
  if (finished) {
    console.clear();
    console.log("GREAT YOU WON ! COME BACK WHEN YOU'R BOARD AGAIN ...");
    v.removeListener(calledOnce);
  }
  line = null;
};

console.log(
  "----------Welcome to our meaningless Game!-------\n -------To Waste your Time , Press ENTER to Play ---------"
);
if (start === false) {
  v.addListener((e) => {
    if (e.name === "RETURN") {
      start = true;
      console.log(map);
      v.addListener(calledOnce);
    }
  });
}
