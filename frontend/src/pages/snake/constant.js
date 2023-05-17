const CANVAS_SIZE = [700, 600];
const SNAKE_START = [
  [8, 6.5],
  [8, 7],
  [8, 7.5],
  [8, 8],
];
const APPLE_START = [8, 3];
const SCALE = 40;
const SPEED = 100;
const DIRECTIONS = {
  38: [0, -0.5], // up
  40: [0, 0.5], // down
  37: [-0.5, 0], // left
  39: [0.5, 0] // right
};

export {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS
};