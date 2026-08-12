import './reset.css';
import './styles.css';
import { normalize } from './utils.js';

const slider = document.querySelector('#progressSlider');
const bigNumber = document.querySelector('.bigNumber');
const progressIndicator = document.querySelector('.progressIndicator');

function handleChange(ev) {
  const progress = Number(ev.target.value);
  
  bigNumber.innerText = progress + '%';
}

slider.addEventListener('input', handleChange);