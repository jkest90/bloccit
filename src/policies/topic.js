// This policy allows us to denote that only admins are allowed to create & edit Topic objects. It inherits all attributes and methods of our ApplicationPolicy.

const ApplicationPolicy = require("./application");

module.exports = class TopicPolicy extends ApplicationPolicy {

  new() {
    return this._isAdmin();
  }

  create() {
    return this.new();
  }

  edit() {
    return this._isAdmin();
  }

  update() {
    return this.edit();
  }

  destroy() {
    return this.update();
  }
  
}
