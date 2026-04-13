import React from "react";

import ScreenSaver from "../../../../components/ScreenSaver";

async function ScreenSaverExercise({ params }) {
  const { color } = await params;
  console.log(params);
  return (
    <main className="screen-saver-wrapper">
      <ScreenSaver color={color} />
    </main>
  );
}

export default ScreenSaverExercise;
