//models/Employee.js
export default class Employee {
  constructor({
    id,
    name,
    salary,
    role,
    permission,
    startDate,
    citizenId,
    office,
    desk,
  } = {}) {
    this.id = id ?? null;
    this.name = name ?? "";
    this.salary = salary ?? 0;
    this.role = role ?? { name: "Unknown" };
    this.startDate = startDate ? new Date(startDate) : null;
    this.permission = Object.assign(
      { canView: false, canEdit: false, canApprove: false },
      permission
    );
    this.citizenId = citizenId ?? "";

    // เพิ่ม office และ desk
    this.office =
      office || (this.role?.name === "Manager" ? "Manager Office" : "-");
    // สุ่มโต๊ะสำหรับ Manager (1-20)
    this.desk =
      desk ||
      (this.role?.name === "Manager"
        ? Math.floor(Math.random() * 20 + 1)
        : "-");
  }

  getInfo() {
    return `${this.name} (${
      this.role && this.role.name ? this.role.name : "Unknown"
    })`;
  }

  can(action) {
    switch (action) {
      case "view":
        return Boolean(this.permission.canView);
      case "edit":
        return Boolean(this.permission.canEdit);
      case "approve":
        return Boolean(this.permission.canApprove);
      default:
        return false;
    }
  }

  getFormattedStartDate() {
    if (!this.startDate) return "-";
    return this.startDate.toLocaleString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  getWorkDuration() {
    if (!this.startDate) return "-";
    const now = new Date();
    const diffMs = now - this.startDate;

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const years = Math.floor(days / 365);
    const months = Math.floor((days % 365) / 30);

    if (years > 0) return `${years} ปี ${months} เดือน`;
    if (months > 0) return `${months} เดือน`;
    return `${days} วัน`;
  }
}
