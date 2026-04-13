const pacmans = [...document.querySelectorAll(".pacman")];

document.addEventListener("pointermove", (event) => {
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  pacmans.forEach((pacman) => {
    const pacmanBox = pacman.getBoundingClientRect();
    const pacmanXCenter = (pacmanBox.left + pacmanBox.right) / 2;
    const pacmanYCenter = (pacmanBox.top + pacmanBox.bottom) / 2;
    const deltaX = mouseX - pacmanXCenter;
    const deltaY = mouseY - pacmanYCenter;
    const angle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI;
    const transform =
      Math.abs(angle) > 90
        ? `rotate(${angle}deg) scaleY(-1)`
        : `rotate(${angle}deg)`;
    pacman.style.transform = transform;
  });
});
