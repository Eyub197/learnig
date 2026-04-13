import React from "react";
import Link from "next/link";

function ScreenSaverExercise() {
  return (
    <main className="screen-saver-wrapper">
      <ul>
        <li>
          <Link href="01-screensaver/red">Red</Link>
        </li>
        <li>
          <Link href="01-screensaver/tomato">Tomato</Link>
        </li>
        <li>
          <Link href="01-screensaver/brown">Brown</Link>
        </li>
        <li>
          <Link href="01-screensaver/blue">blue</Link>
        </li>
      </ul>
    </main>
  );
}

export default ScreenSaverExercise;
