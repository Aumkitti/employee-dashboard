export default class Permission {
  constructor(input) {
    if (typeof input === "string") {
      const rolePermissions = {
        Manager: { canView: true, canEdit: true, canApprove: true },
        Intern: { canView: true, canEdit: false, canApprove: false },
        PartTime: { canView: true, canEdit: false, canApprove: false },
      };
      Object.assign(this, rolePermissions[input] || {});
    } else {
      Object.assign(this, input);
    }
  }

  can(action) {
    if (action === "view") return this.canView;
    if (action === "edit") return this.canEdit;
    if (action === "approve") return this.canApprove;
    return false;
  }
}
