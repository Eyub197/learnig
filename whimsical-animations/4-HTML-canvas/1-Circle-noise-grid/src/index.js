import { random, range } from 'lodash';
import { setupCanvas, normalize } from './utils';
import './reset.css';
import './styles.css';

const canvas = document.querySelector('canvas');
const { ctx, canvasWidth, canvasHeight } = setupCanvas(canvas);

// Acceptance Criteria:
// - A 20-by-20 grid of circles
// - Random background colors from
//   hsl(210deg 15% 6%) to hsl(210deg 15% 100%).

function draw() {
  // TODO
}

draw();