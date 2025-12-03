import Role from "../model/rolesModel.js";

class RoleService {

  // Create Role
  async createRole(data) {
    return await Role.create(data);
  }

  // Get All Roles
  async getAllRoles() {
    return await Role.find();
  }

  // Get Role By ID
  async getRoleById(id) {
    return await Role.findById(id);
  }

  // Update Role
  async updateRole(id, data) {
    return await Role.findByIdAndUpdate(id, data, { new: true });
  }

  // Delete Role
  async deleteRole(id) {
    return await Role.findByIdAndDelete(id);
  }
}

export default new RoleService();
