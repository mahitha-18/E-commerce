// // routes/userRoutes.js
// import express from "express";
// import {
//   register,
//   login,
//   logout,
//   getAllUsers,
//   getUser,
//   updateUserController,
//   deleteUserController,
// } from "../controller/userController.js";
// import { protect, adminOnly } from "../middleware/authMiddleware.js";

// const router = express.Router();

// /* Public */
// router.post("/register", register);
// router.post("/login", login);
// router.post("/logout", logout);

// /* Protected Routes */
// router.get("/getall", protect, adminOnly, getAllUsers);
// router.get("/getbyid/:id", protect, adminOnly, getUser);
// router.put("/update/:id", protect, adminOnly, updateUserController);
// router.delete("/delete/:id", protect, adminOnly, deleteUserController);

// export default router;

import express from "express";
import UserController from "../controller/userController.js";

const router = express.Router();

router.post("/create", UserController.create);
router.post("/login", UserController.login);

router.get("/getall", UserController.getAll);
router.get("/getby/:id", UserController.getById);
router.put("/update/:id", UserController.update);
router.delete("/delete/:id", UserController.delete);

export default router;
