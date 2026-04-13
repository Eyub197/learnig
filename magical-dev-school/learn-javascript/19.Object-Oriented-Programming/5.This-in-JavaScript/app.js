function print(message = "Im touching myself") {
  console.log(message);
  console.log(this);
}

class Employee {
  constructor(role, salary) {
    this.role = role;
    2;
    this.salary = salary;
    this.logThis = function () {
      console.log(this);
    };
  }

  logger() {
    const sayThis = () => {
      console.log(this);
    };
    sayThis();
  }
}
const money = {
  sayThis() {
    const SHOUT = () => {
      console.log(this);
    };
    SHOUT();
  },
};

money.sayThis();
