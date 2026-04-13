function signUpForPlan(plan = "basic") {
  console.log(`the plan is ${plan}`);
}

function createEmployee(employee) {
  const {
    firstName,
    lastNamem,
    age,
    gemder,
    position = "associate",
  } = employee;

  console.log(position);
}

const employee = {
  firstName: "Melih",
  lastName: "",
  age: "",
  gender: "",
  position: undefined,
};

// signUpForPlan("premium");
createEmployee(employee);
