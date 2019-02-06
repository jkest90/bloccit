const ApplicationPolicy = require("./application");

module.exports = class PostPolicy extends ApplicationPolicy {

   newOrCreate() {
      return this.new();
   }

   modify() {
      return this.edit();
   }

   destroy() {
      return this.modify();
   }
}
