import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserService from "../service/userService.js";

class UserController {

  // CREATE USER
  async create(req, res) {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // LOGIN USER
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserService.loginUser(email);

      if (!user) return res.status(404).json({ message: "User not found" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid password" });

      // Update last login time
      user.last_login_at = new Date();
      await user.save();

      const token = jwt.sign(
        { id: user._id, role: user.role_id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({ token, user });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // GET ALL USERS
  async getAll(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // GET USER BY ID
  async getById(req, res) {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // UPDATE
  async update(req, res) {
    try {
      const user = await UserService.updateUser(req.params.id, req.body);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // DELETE
  async delete(req, res) {
    try {
      const result = await UserService.deleteUser(req.params.id);
      if (!result) return res.status(404).json({ message: "User not found" });
      res.json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default new UserController();
