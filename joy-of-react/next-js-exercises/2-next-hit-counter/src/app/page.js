import React from "react";
import { readFile, writeFile } from "../helpers/file-helpers";
import HitCounter from "../components/HitCounter/HitCounter";
import Censored from "../components/Censored/Censored";

function Home() {
  return (
    <main>
      <h1>Welcome!</h1>
      <p>
        You are visitor number{" "}
        <Censored>
          <HitCounter />
        </Censored>
        .
      </p>
    </main>
  );
}

export default Home;
