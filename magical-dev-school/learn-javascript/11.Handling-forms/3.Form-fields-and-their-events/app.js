const form = document.querySelector("form");
// const textInput = form.elements[0];

// form.addEventListener("submit", (event) => {
//   event.preventDefault();
//   const formData = new FormData(form);
//   console.log(formData.get("text"));
// });

// textInput.addEventListener("input", () => {
//   const formData = new FormData(form);
//   console.log(formData.get("text").trim());
// });

// textInput.addEventListener("focus", () => {
//   console.log(textInput.value.trim());
// });

// textInput.addEventListener("blur", () => {
//   console.log(`focus out ${textInput.value.trim()}`);
// });

// const checkedFruit = [
//   ...document.querySelectorAll("input[type='checkbox']:checked"),
// ];

// form.addEventListener("change", (event) => {
//   event.preventDefault();
//   const checkedFruit = [
//     ...document.querySelectorAll("input[type='checkbox']:checked"),
//   ];
//   console.log(checkedFruit);
// });

// const checkedRadioFruits = document.querySelectorAll(
//   "input[type='radio']:checked",
// );

// form.addEventListener("change", () => {
//   const checkedRadioFruits = document.querySelectorAll(
//     "input[type='radio']:checked",
//   );
//   console.log(checkedRadioFruits);
// });

const textarea = form.elements[0];

textarea.addEventListener("input", (event) => {
  console.log(event.target.value);
});

textarea.addEventListener("focus", (event) => {
  console.log(`focus ${event.target.value}`);
});

textarea.addEventListener("focusout", (event) => {
  console.log(`focusout ${event.target.value}`);
});
