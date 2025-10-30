// src/models/EmployeeTypes.js
import Employee from "./Employee";

// 🧠 ใช้ Polymorphism: แต่ละ subclass มีการคำนวณโบนัสไม่เหมือนกัน
export class Manager extends Employee {
  calculateBonus() {
    return this.salary * 0.3; // โบนัส 30%
  }
}

export class Intern extends Employee {
  calculateBonus() {
    return this.salary * 0.05; // โบนัส 5%
  }
}

export class PartTime extends Employee {
  calculateBonus() {
    return this.salary * 0.1; // โบนัส 10%
  }
}

// 🔄 fallback: employee ปกติที่ไม่มี subclass เฉพาะ
export class RegularEmployee extends Employee {
  calculateBonus() {
    return this.salary * 0.15; // โบนัส 15% สำหรับทั่วไป
  }
}
