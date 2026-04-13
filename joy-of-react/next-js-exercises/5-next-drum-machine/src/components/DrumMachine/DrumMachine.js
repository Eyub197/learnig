"use client";
import React from "react";
import useSound from "use-sound";

import styles from "./DrumMachine.module.css";

import { SoundContext } from "../SoundProvider";
const SOUND_SRC = "/909-drums.mp3";

function DrumMachine() {
  const { soundEnable } = React.useCallback(SoundContext);

  const [play] = useSound(SOUND_SRC, {
    sprite: {
      kick: [0, 350],
      hihat: [374, 160],
      snare: [666, 290],
      cowbell: [968, 200],
    },
    soundEnabled: soundEnable ? true : false,
  });

  return (
    <div className={styles.wrapper}>
      <button onClick={() => play({ id: "kick" })}>Kick</button>
      <button onClick={() => play({ id: "hihat" })}>Hat</button>
      <button onClick={() => play({ id: "snare" })}>Snare</button>
      <button onClick={() => play({ id: "cowbell" })}>Cowbell</button>
    </div>
  );
}

export default DrumMachine;
