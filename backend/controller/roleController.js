import RoleService from "../service/roleService.js";

class RoleController {

  // Create
  async create(req, res) {
    try {
      const role = await RoleService.createRole(req.body);
      res.status(201).json(role);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Get All
  async getAll(req, res) {
    try {
      const roles = await RoleService.getAllRoles();
      res.json(roles);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Get By ID
  async getById(req, res) {
    try {
      const role = await RoleService.getRoleById(req.params.id);
      if (!role) return res.status(404).json({ message: "Role not found" });
      res.json(role);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Update Role
  async update(req, res) {
    try {
      const role = await RoleService.updateRole(req.params.id, req.body);
      if (!role) return res.status(404).json({ message: "Role not found" });
      res.json(role);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Delete Role
  async delete(req, res) {
    try {
      const result = await RoleService.deleteRole(req.params.id);
      if (!result) return res.status(404).json({ message: "Role not found" });
      res.json({ message: "Role deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default new RoleController();
