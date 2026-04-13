// Element.before polyfill
// https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/before
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty("before")) return;
    Object.defineProperty(item, "before", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function before() {
        var argArr = Array.prototype.slice.call(arguments);
        var docFrag = document.createDocumentFragment();

        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(
            isNode ? argItem : document.createTextNode(String(argItem)),
          );
        });

        this.parentNode.insertBefore(docFrag, this);
      },
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

const draggables = [...document.querySelectorAll("[data-draggable]")];
const draggable = draggables[0];
const dropzone = document.querySelector("[data-dropzone]");

function getPreviwPositions(dropzone) {
  const elements = [...dropzone.children];
  return elements.map((element) => element.getBoundingClientRect());
}

draggables.forEach((draggable) => {
  draggable.addEventListener("pointerdown", (event) => {
    // fixing firex
    event.preventDefault();

    draggable.addEventListener("touchaction", (event) => {
      event.preventDefault();
    });

    let prevScreenX = event.screenX;
    let prevScreenY = event.screenY;
    const target = event.target;
    const preview = target.cloneNode();
    preview.classList.add("preview");
    target.before(preview);
    target.dataset.dragging = "true";

    const box = preview.getBoundingClientRect();
    const boxLeft = box.left;
    const boxTop = box.top;
    target.style.top = `${boxTop}px`;
    target.style.left = `${boxLeft}px`;
    target.setPointerCapture(event.pointerId);

    target.addEventListener("pointerup", up);
    target.addEventListener("pointermove", move);

    function move(event) {
      const { clientX, clientY, screenX, screenY } = event;

      const movementX = screenX - prevScreenX;
      const movementY = screenY - prevScreenY;
      prevScreenX = screenX;
      prevScreenY = screenY;

      const left = parseFloat(target.style.left);
      const top = parseFloat(target.style.top);

      target.style.left = `${left + movementX}px`;
      target.style.top = `${top + movementY}px`;

      target.hidden = true;
      const hitTest = document.elementFromPoint(clientX, clientY);
      target.hidden = false;

      if (!hitTest) return;

      const elements = [...dropzone.children].filter(
        (el) => el !== target && el !== preview,
      );
      const positions = elements.map((element) =>
        element.getBoundingClientRect(),
      );

      const positionIndex = positions.findIndex((pos) => {
        return (
          pos.left < clientX &&
          clientX < pos.right &&
          pos.top < clientY &&
          clientY < pos.bottom
        );
      });

      if (positionIndex === -1) return;

      const elem = elements[positionIndex];

      const elemIndex = [...dropzone.children].indexOf(elem);
      const previewIndex = [...dropzone.children].indexOf(preview);

      if (elemIndex > previewIndex) {
        elem.after(preview);
      } else {
        elem.before(preview);
      }
    }

    function up(event) {
      target.removeEventListener("pointermove", move);
      target.removeEventListener("pointerup", up);
      target.dataset.dragging = "false";
      preview.before(target);
      preview.remove();
      target.releasePointerCapture(event.pointerId);
    }
  });
});
