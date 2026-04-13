const myBuss = {
  offer: "Save 20 hours a week of boring work",
  price: 2000,
  place: {
    city: "Varna",
    office: "home",
  },
};

const reuqiredSkills = {
  skillOne: "Ai aoutomatins",
  skillTwo: "Sales",
  place: {
    city: "Razgrad",
  },
};

const sTierBuss = Object.assign({}, myBuss, reuqiredSkills);

const merged = {
  ...myBuss,
  ...reuqiredSkills,
  place: {
    ...myBuss.place,
    ...reuqiredSkills.place,
  },
};

console.log(merged);
