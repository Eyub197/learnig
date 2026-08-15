import { normalize } from './utils';
import './reset.css';
import './styles.css';

const btn = document.querySelector('.like-btn');

const MAX_NUM_OF_LIKES = 10;
let numOfLikes = 0;

btn.addEventListener('click', () => {
  numOfLikes += 1;

  // When the button is fully liked and the user clicks,
  // reset back to zero. This is done purely to make
  // development easier, this isn’t really a feature
  if (numOfLikes > MAX_NUM_OF_LIKES) {
    numOfLikes = 0;
  }

  const fillRatio = numOfLikes / MAX_NUM_OF_LIKES;
  
  // TODO: use `fillRatio` to control the perceived
  // fill amount.
  // (0 = empty, 1 = full)
});