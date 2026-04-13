"use client";
import React from "react";
import { Volume2, VolumeX } from "react-feather";

import VisuallyHidden from "../VisuallyHidden";
import MaxWidthWrapper from "../MaxWidthWrapper";
import styles from "./Header.module.css";
import { SoundContext } from "../../components/SoundProvider";

function Header() {
  const { soundEnable, setSoundEnable } = React.useContext(SoundContext);
  const id = React.useId();

  return (
    <header className={styles.wrapper}>
      <MaxWidthWrapper className={styles.innerWrapper}>
        <a href="/">Kool Website</a>

        <button onClick={() => setSoundEnable(!soundEnable)}>
          {soundEnable ? <Volume2 /> : <VolumeX />}
          <VisuallyHidden>
            {soundEnable ? "Disable sound effects" : "Enable sound effects"}
          </VisuallyHidden>
        </button>
      </MaxWidthWrapper>
    </header>
  );
}

export default Header;
