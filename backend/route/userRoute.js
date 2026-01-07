// import express from "express";
// import UserController from "../controller/userController.js";
// import upload from "../middleware/upload.js";

// const router = express.Router();

// export default router.post(
//   "/create",
//   (req, res, next) => {
//     upload.fields([
//       { name: "image", maxCount: 1 },
//       { name: "Resume", maxCount: 1 },
//     ])(req, res, (err) => {
//       if (err) return res.status(400).json({ message: err.message });
//       next();
//     });
//   },
//   UserController.registerUser
// );

import express from "express";
import UserController from "../controller/userController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// ------------------------------
// REGISTER USER
// ------------------------------
router.post(
  "/create",
  (req, res, next) => {
    upload.fields([
      { name: "image", maxCount: 1 },
      { name: "Resume", maxCount: 1 },
    ])(req, res, (err) => {
      if (err) return res.status(400).json({ message: err.message });
      next();
    });
  },
  UserController.registerUser
);
router.get("/getall", UserController.getAll);
router.get("/getby/:id", UserController.getById);
router.put("/update/:id", UserController.update);
router.delete("/delete/:id", UserController.delete);
// ------------------------------
// VERIFY OTP
// ------------------------------
router.post("/verify-otp", UserController.verifyOtp);
// router.post("/otp/generate", UserController.generateOtp);

router.put("/change-password/:id", UserController.changePassword);
router.post("/login", UserController.login);
router.post("/forgot-password", UserController.forgotPassword);
router.post("/reset-password", UserController.resetPassword);
router.get("/getbyrole/:roleId", UserController.getUsersByRole);


router.post("/resend-otp", UserController.resendOtp);

export default router;
