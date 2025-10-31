import Employee from "./Employee";

export class Manager extends Employee {
  calculateBonus() {
    return this.salary * 0.3;
  }
}

export class Intern extends Employee {
  calculateBonus() {
    return this.salary * 0.05;
  }
}

export class PartTime extends Employee {
  calculateBonus() {
    return this.salary * 0.1;
  }
}

export class PermanentEmployee extends Employee {
  calculateBonus() {
    return this.salary * 0.15;
  }
}

export default {
  Manager,
  Intern,
  PartTime,
  PermanentEmployee,
};
