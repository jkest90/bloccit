// A policy will dictate what actions can be performed on a given object by a user.
// Each resource will have its policy, and will inherit from a parent policy with reasonable defaults.
// This file represents the parent policy. All of these methods return boolean values.
// We will use them to determine if an action should proceed as requested or if a redirect is in order.

module.exports = class ApplicationPolicy {

   constructor(user, record) {
      this.user = user;
      this.record = record;
   }

   // a helper method that checks that a record is present and the user owns it.
   _isOwner() {
      return this.record && (this.record.userId == this.user.id);
   }

   // a helper method that checks that a user is present and that the user is an admin user.
   _isAdmin() {
      return this.user && this.user.role == "admin";
   }

   // checks that a user is present.
   new() {
      return this.user != null;
   }

   // delegates to new() and checks that a user is signed in.
   create() {
      return this.new();
   }

   // always authorizes the action.
   show() {
      return true;
   }

   // checks that the user is allowed to create a new record, a record is present, and either the user owns the record, or the user is an admin.
   edit() {
      return this.new() &&
         this.record && (this._isOwner() || this._isAdmin());
   }

   update() {
      return this.edit();
   }

   // delegates to update
   destroy() {
      return this.update();
   }
}
