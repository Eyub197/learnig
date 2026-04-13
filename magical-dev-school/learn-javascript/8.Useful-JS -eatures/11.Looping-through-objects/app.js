const momObject = {
  age: 16,
  name: "mom",
  bornIn: "Razgrad",
};

Object.keys(momObject).forEach((key) => console.log(key));
Object.values(momObject).forEach((value) => console.log(value));
Object.entries(momObject).forEach(([key, value]) => console.log(key, value));
