import React from 'react';
import Banner from '../Banner/Banner';

function LostBanner({ answer, action }) {
  return <Banner status="sad">
    <p>Sorry, the correct answer is <strong>{answer}</strong>.</p>
     <button onClick={action} >Reset game</button>
  </Banner>;
}

export default LostBanner;
