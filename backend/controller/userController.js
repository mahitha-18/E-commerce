import argon2 from "argon2";
import jwt from "jsonwebtoken";
import userService from "../service/userService.js";
import nodemailer from "nodemailer";

class UserController {
// async registerUser(request, response) {
//     try {
//       const result = await UserService.createUser(request.body, request.files);

//       return response.status(result.status).json({
//         message: result.message,
//         result: result.result,
//       });
//     } catch (err) {
//       console.error("Register User Error:", err);
//       const status = err.statusCode || 500;

//       return response.status(status).json({
//         message: err.message || "Something went wrong",
//       });
//     }
//   }
async registerUser(req, res) {
  try {
    const result = await userService.createUser(req.body, req.files);
    return res.status(result.status).json(result);
  } catch (err) {
    console.error("Register User Error:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

async verifyOtp(req, res) {
    try {
      const { email, otp } = req.body;

      if (!email || !otp) {
        return res.status(400).json({
          status: 400,
          message: "Email and OTP are required",
        });
      }

      const result = await userService.verifyOtpService(email, otp);

      return res.status(result.status).json(result);
      // return res.status(result.success ? 200 : 400).json(result);

    } catch (error) {
      console.error("Controller Error:", error);
      return res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  }
async resendOtp(req, res) {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email is required",
        });
      }
      const result = await UserService.resendOtpService(email);
      // return res.status(result.status).json(result);
            return res.status(result.success ? 200 : 400).json(result);
    }
    catch (error) {
      console.error("Controller Error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }

// ------------------------------
// CHANGE PASSWORD
// ------------------------------
async changePassword(req, res) {
  try {
    const userId = req.params.id;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        status: 400,
        message: "Old password and new password are required",
      });
    }

    const result = await userService.changePassword(
      userId,
      oldPassword,
      newPassword
    );

    return res.status(result.status).json(result);
  } catch (err) {
    console.error("Change Password Error:", err);
    return res.status(500).json({ status: 500, message: "Something went wrong" });
  }
}

  // CREATE USER
  // async create(req, res) {
  //   try {
  //     const user = await UserService.createUser(req.body);
  //     res.status(201).json(user);
  //   } catch (err) {
  //     res.status(500).json({ message: err.message });
  //   }
  // }

  // async create(req, res) {
  // try {
  //   // 1️⃣ Create the user
  //   const user = await UserService.createUser(req.body);

  //   // 2️⃣ Generate OTP
  //   const otp = UserService.generateOTP(user._id);

    // 3️⃣ Send OTP via email
    // const transporter = nodemailer.createTransport({
    //   service: "gmail", // or your SMTP
    //   auth: {
    //     user: process.env.EMAIL,
    //     pass: process.env.EMAIL_PASSWORD,
    //   },
    // });

    // const mailOptions = {
    //   from: process.env.EMAIL,
    //   to: user.email,
    //   subject: "Welcome! Your OTP Code",
    //   text: `Hello ${user.name},\n\nYour OTP is: ${otp}. It will expire in 5 minutes.`,
    // };

    // const info = await transporter.sendMail(mailOptions);
    // console.log("Email sent:", info.response);

    // 4️⃣ Respond with created user and OTP info (remove OTP in production)
//     res.status(201).json({
//       success: true,
//       message: "User created successfully, OTP sent via email",
//       user,
//       otp, // remove this in production
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// }



  // LOGIN USER
//   async login(req, res) {
//     try {
//       const { email, password } = req.body;
//       const user = await userService.loginUser(email);

//       if (!user) return res.status(404).json({ message: "User not found" });

//       const isMatch = await argon2.verify(user.password, password);
//       if (!isMatch) return res.status(400).json({ message: "Invalid password" });

//       // Update last login time
//       user.last_login_at = new Date();
//       await user.save();

//       const token = jwt.sign(
//         { id: user._id, role: user.role_id },
//         process.env.JWT_SECRET,
//         { expiresIn: "1d" }
//       );
// const userObj = user.toObject ? user.toObject() : user;
//     const { password: pwd, otp, ...safeUser } = userObj;

//       res.json({ token, user: safeUser  });
//     } catch (err) {
//           console.error("Login error:", err);

//       res.status(500).json({ message: err.message });
//     }
//   }
async login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userService.loginUser(email);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Update last login time
    user.last_login_at = new Date();
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const userObj = user.toObject ? user.toObject() : user;
    const { password: pwd, otp, ...safeUser } = userObj;

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
      // user: safeUser,
    });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      success: false,
      message: "Login failed. Please try again.",
    });
  }
}

  // ------------------------------
// FORGOT PASSWORD - SEND OTP
// ------------------------------
async forgotPassword(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        status: 400,
        message: "Email is required",
      });
    }

    const result = await userService.forgotPasswordService(email);
    return res.status(result.status).json(result);

  } catch (err) {
    console.error("Forgot Password Error:", err);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}

// ------------------------------
// RESET PASSWORD
// ------------------------------
async resetPassword(req, res) {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        status: 400,
        message: "Email, OTP, and new password are required",
      });
    }

    const result = await userService.resetPasswordService(
      email,
      otp,
      newPassword
    );

    return res.status(result.status).json(result);

  } catch (err) {
    console.error("Reset Password Error:", err);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}

 // ============================
  // GET USERS BY ROLE
  // ============================
  async getUsersByRole(req, res) {
    try {
      const { roleId } = req.params;

      if (!roleId) {
        return res.status(400).json({ message: "Role ID is required" });
      }

      const response = await userService.getUsersByRole(roleId);

      return res.status(response.status).json(response);

    } catch (error) {
      console.error("Controller Error (getUsersByRole):", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }


  // GET ALL USERS
  async getAll(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // GET USER BY ID
  async getById(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // UPDATE
  async update(req, res) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // DELETE
  async delete(req, res) {
    try {
      const result = await userService.deleteUser(req.params.id);
      if (!result) return res.status(404).json({ message: "User not found" });

      res.json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

}
export default new UserController();
