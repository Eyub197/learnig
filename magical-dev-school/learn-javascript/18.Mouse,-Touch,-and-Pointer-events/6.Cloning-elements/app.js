const elementToClone = document.querySelector(".element-to-clone");
const elementToCLoneWithChildren = document.querySelector(
  ".element-to-clone-with-children",
);
const clone = elementToClone.cloneNode();
const cloneWithChildren = elementToCLoneWithChildren.cloneNode(true);

document.body.appendChild(cloneWithChildren);
