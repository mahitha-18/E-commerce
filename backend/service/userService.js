// import mongoose from "mongoose";
// import User from "../model/userModel.js";

// const generateOTP = () => {
//   return Math.floor(1000 + Math.random() * 9000).toString();
// };

// class UserService {

// const createUser = async (userData, files) => {
//   try {
//     const existingUser = await userModel.findOne({
//       $or: [{ email: userData.email }, { mobile: userData.mobile }],
//     });

//     if (existingUser) {
//       const emailExists = existingUser.email === userData.email;
//       const mobileExists = existingUser.mobile === userData.mobile;

//       if (emailExists && mobileExists) {
//         return { message: "Email and Mobile already exist", status: 409 };
//       } else if (emailExists) {
//         return { message: "Email already exists", status: 409 };
//       } else if (mobileExists) {
//         return { message: "Mobile Number already exists", status: 409 };
//       }
//     }

//     // Validate resume for employee
//     if (userData.roles === "employee" && !files?.Resume?.[0]) {
//       return { message: "Resume is required for employee role", status: 400 };
//     }

//     // Check for invalid resume before proceeding
//     // const resumeFile = files?.Resume?.[0];
//     // if (resumeFile && !allowedResumeTypes.includes(resumeFile.mimetype)) {
//     //   return {
//     //     message: "Invalid resume format. Only PDF, DOC, DOCX allowed.",
//     //     status: 400,
//     //   };
//     // }

//     // Check for invalid image before proceeding
//     const profileImageFile = files?.profileImage?.[0];
//     if (
//       profileImageFile &&
//       !allowedImageTypes.includes(profileImageFile.mimetype)
//     ) {
//       return {
//         message:
//           "Invalid profile image type. Only JPG, JPEG, PNG, WEBP allowed.",
//         status: 400,
//       };
//     }

//     const hashedPassword = await argon2.hash(userData.password);
//     const Newotp = generateOTP();

//     // Now safe to create user object
//     let role = userData.roles;
//     let userType = userData.userType;

//     // Prevent anyone from registering as admin
//     // if (role === "admin" || userType === "admin") {
//     //   return { message: "Unauthorized role selection", status: 403 };
//     // }

//     const newUser = new userModel({
//       ...userData,
//       roles: role || "user", // default to "user"
//       userType: userType || "general", // fallback if needed
//       otp: Newotp,
//       password: hashedPassword,
//     });

//     // Now save the valid profile image
//     if (profileImageFile) {
//       const ext = path.extname(profileImageFile.originalname);
//       let base = path.basename(profileImageFile.originalname, ext);
//       base = base.replace(/\s+/g, "_"); // Replace spaces with underscores
//       const filename = ${Date.now()}_${base}${ext};
//       const filePath = path.join("public", "profileImage", filename);

//       if (!fs.existsSync(path.dirname(filePath))) {
//         fs.mkdirSync(path.dirname(filePath), { recursive: true });
//       }

//       fs.writeFileSync(filePath, profileImageFile.buffer);
//       newUser.profileImage = /profileImage/${filename};
//     }

//     // Now save the valid resume file
//     if (resumeFile) {
//       const ext = path.extname(resumeFile.originalname);
//       let base = path.basename(resumeFile.originalname, ext);
//       base = base.replace(/\s+/g, "_"); // Replace spaces with underscores
//       const filename = ${Date.now()}_${base}${ext};
//       const filePath = path.join("public", "resumes", filename);

//       if (!fs.existsSync(path.dirname(filePath))) {
//         fs.mkdirSync(path.dirname(filePath), { recursive: true });
//       }

//       fs.writeFileSync(filePath, resumeFile.buffer);
//       newUser.Resume = [/resumes/${filename}];
//     }

//     await newUser.validate();
//     const result = await newUser.save();

//     if (result) {
//       await sendOTPEmail(userData.email, Newotp);
//     }

//     result.password = undefined;
//     result.otp = undefined;

//     return {
//       message: "Registered Successfully. OTP sent to email.",
//       status: 200,
//       result,
//     };
//   } catch (error) {
//     console.error("Error creating user:", error);
//     return {
//       message: "Internal Server Error",
//       status: 500,
//       error: error.message,
//       stack: error.stack,
//     };
//   }
// }
//   // CREATE
//   async createUser(data) {
//     return await User.create(data);
//   }

//   // LOGIN (email + password)
//   async loginUser(email) {
//     return await User.findOne({ email });
//   }

//   // GET ALL USERS
//   async getAllUsers() {
//     return await User.find().populate("role_id admin_id subAdmin_id");
//   }

//   // GET BY ID
//   async getUserById(id) {
//     return await User.findById(id).populate("role_id admin_id subAdmin_id");
//   }

//   // UPDATE
//   // async updateUser(id, data) {
//   //   return await User.findByIdAndUpdate(id, data, { new: true });
//   // }

//   async updateUser(id, data) {
//   const user = await User.findById(id);
//   if (!user) return null;

//   Object.assign(user, data);
//   await user.save();  // triggers pre-save hook properly

//   return user;
// }


//   // DELETE
//   async deleteUser(id) {
//     return await User.findByIdAndDelete(id);
//   }


//   // GENERATE OTP
//   // async generateOTP(userId) {
//   //   // Validate ObjectId
//   //   if (!mongoose.Types.ObjectId.isValid(userId)) {
//   //     throw new Error("Invalid user ID");
//   //   }

//   //   // Find user
//   //   const user = await User.findById(userId);
//   //   if (!user) {
//   //     throw new Error("User not found");
//   //   }

//   //   // Generate 6-digit OTP
//   //   const otp = Math.floor(100000 + Math.random() * 900000);

//   //   // Set expiration 5 min
//   //   user.otp = otp;
//   //   user.otp_expires_at = new Date(Date.now() + 5 * 60 * 1000);

//   //   await user.save(); // triggers pre-save hooks

//   //   return { otp, user };
//   // }

//   // // VERIFY OTP
//   // async verifyOTP(userId, otp) {
//   //   if (!mongoose.Types.ObjectId.isValid(userId)) {
//   //     return { success: false, message: "Invalid user ID" };
//   //   }

//   //   const user = await User.findById(userId);
//   //   if (!user) return { success: false, message: "User not found" };

//   //   // OTP expired
//   //   if (!user.otp_expires_at || user.otp_expires_at < new Date()) {
//   //     return { success: false, message: "OTP expired" };
//   //   }

//   //   // OTP mismatch
//   //   if (user.otp !== otp) {
//   //     return { success: false, message: "Invalid OTP" };
//   //   }

//   //   // Success → clear OTP
//   //   user.otp = null;
//   //   user.otp_expires_at = null;
//   //   await user.save();

//   //   return { success: true, message: "OTP verified successfully" };
//   // }
// }

// export default new UserService();


// const allowedImageTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
// const allowedResumeTypes = [
//   "application/pdf",
//   "application/msword",
//   "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
// ];

// ------------------------------
// OTP Generator
// ------------------------------
// const generateOTP = () => {
//   return Math.floor(1000 + Math.random() * 9000).toString();
// };


  // ------------------------------
  // CREATE USER WITH FILE UPLOAD + OTP
  // ------------------------------
  //  async createUser(userData, files) {
  //   try {
  //     // ---------- DUPLICATE CHECK ----------
  //     const existingUser = await userModel.findOne({
  //       $or: [{ email: userData.email }, { phone_number: userData.phone_number }],
  //     });

  //     if (existingUser) {
  //       const emailExists = existingUser.email === userData.email;
  //       const phoneExists = existingUser.phone_number === userData.phone_number;

  //       if (emailExists && phoneExists) return { status: 409, message: "Email and Mobile already exist" };
  //       if (emailExists) return { status: 409, message: "Email already exists" };
  //       if (phoneExists) return { status: 409, message: "Mobile Number already exists" };
  //     }

  //     // ---------- FILES ----------
  //     const profileImageFile = files?.image?.[0];
  //     const resumeFile = files?.Resume?.[0];

  //     // ---------- EXTRA SERVER-SIDE VALIDATION ----------
  //     if (profileImageFile && !allowedImageTypes.includes(profileImageFile.mimetype)) {
  //       return { status: 400, message: "Invalid profile image format" };
  //     }

  //     if (resumeFile && !allowedResumeTypes.includes(resumeFile.mimetype)) {
  //       return { status: 400, message: "Invalid resume format" };
  //     }

  //     // ---------- PREPARE USER DATA ----------
  //     const hashedPassword = await argon2.hash(userData.password);
  //     const OTP = this.generateOTP();

  //     const newUserData = {
  //       ...userData,
  //       otp: OTP,
  //       password: hashedPassword,
  //       image: profileImageFile ? profileImageFile.path : null,
  //       Resume: resumeFile ? resumeFile.path : null,
  //     };

  //     // ---------- SAVE TO DB ----------
  //     const newUser = new userModel(newUserData);
  //     const result = await newUser.save();

  //     // ---------- SEND OTP (Non-blocking) ----------
  //     try {
  //       await sendOTPEmail(userData.email, OTP);
  //     } catch (err) {
  //       console.error("OTP Email Failed:", err.message);
  //     }

  //     result.password = undefined;
  //     result.otp = undefined;

  //     return {
  //       status: 200,
  //       message: "Registered Successfully. OTP sent to email.",
  //       result,
  //     };
  //   } catch (error) {
  //     console.error("Create User Error:", error);

  //     if (error.code === 11000) {
  //       const field = Object.keys(error.keyValue)[0];
  //       return {
  //         status: 409,
  //         message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
  //       };
  //     }

  //     return { status: 500, message: "Internal Server Error" };
  //   }
  // }
import fs from "fs";
import path from "path";
import argon2 from "argon2";
import userModel from "../model/userModel.js";
import { sendOTPEmail } from "../utils/sendOTPEmail.js";
import { sendForgotPasswordOTPEmail } from "../utils/sendForgotPasswordOTPEmail.js";
import jwt from "jsonwebtoken";
import { allowedImageTypes, allowedResumeTypes } from "../utils/constants.js";
import roleModel from "../model/rolesModel.js";

  class UserService {
 constructor() {
    this.otpStore = new Map(); // <---- FIX
  }
  generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };
  async createUser(userData, files) {
  try {
    // ---------- DUPLICATE CHECK ----------
    const existingUser = await userModel.findOne({
      $or: [{ email: userData.email }, { phone_number: userData.phone_number }],
    });

    if (existingUser) {
      const emailExists = existingUser.email === userData.email;
      const phoneExists = existingUser.phone_number === userData.phone_number;

      if (emailExists && phoneExists) return { status: 409, message: "Email and Mobile already exist" };
      if (emailExists) return { status: 409, message: "Email already exists" };
      if (phoneExists) return { status: 409, message: "Mobile Number already exists" };
    }

    // ---------- VALIDATION SUCCESS ----------
    // NOW we can save the files manually
    const profileImageFile = files?.image?.[0];
    const resumeFile = files?.Resume?.[0];

    let imagePath = null;
    let resumePath = null;

    // SAVE IMAGE ***
    if (profileImageFile) {
      const imageDir = path.join(process.cwd(), "uploads", "images");
      if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir, { recursive: true });

      const filename = `${Date.now()}-${profileImageFile.originalname.replace(/\s+/g, "_")}`;
      imagePath = path.join(imageDir, filename);
      fs.writeFileSync(imagePath, profileImageFile.buffer);
    }

    // SAVE RESUME ***
    if (resumeFile) {
      const resumeDir = path.join(process.cwd(), "uploads", "resumes");
      if (!fs.existsSync(resumeDir)) fs.mkdirSync(resumeDir, { recursive: true });

      const filename = `${Date.now()}-${resumeFile.originalname.replace(/\s+/g, "_")}`;
      resumePath = path.join(resumeDir, filename);
      fs.writeFileSync(resumePath, resumeFile.buffer);
    }

    const hashedPassword = await argon2.hash(userData.password);
    const OTP = this.generateOTP();

       // -------------------------------------------------
    //   🔥 AUTO-DETECT CUSTOMER ROLE (NO HARDCODING)
    // -------------------------------------------------
    const role = await roleModel.findById(userData.role_id);

    let isActive = true;

    if (role && role.name.toLowerCase() === "customer") {
      isActive = false; // customer becomes inactive until OTP verification
    }

    this.otpStore.set(userData.email, {
      otp: OTP,
      expiresAt: Date.now() + 1 * 60 * 1000,
    });

    if (process.env.NODE_ENV !== "test") {
    setTimeout(() => this.otpStore.delete(userData.email), 2 * 60 * 1000);
}
    // ----

    const newUser = new userModel({
      ...userData,
      otp: OTP,
      password: hashedPassword,
      image: imagePath,
      Resume: resumePath,
      is_active: isActive,
    });

    const result = await newUser.save();

    await sendOTPEmail(userData.email, OTP).catch(() => {});

    result.password = undefined;
    result.otp = undefined;

    return {
      status: 200,
      message: "Registered Successfully. OTP sent to email.",
      result,
    };

  } catch (error) {
    console.error(error);

    // duplicate
    if (error.code === 11000) {
      return { status: 409, message: "Duplicate record", fields: error.keyValue };
    }

    return { status: 500, message: "Internal Server Error" };
  }
}

async verifyOtpService(email, enteredOtp) {
  try {
    // Get OTP record from store
    const record = this.otpStore.get(email);

    if (!record) {
      return { status: 400, success: false, message: "OTP expired. Request a new one." };
    }

    // Check expiration
    if (Date.now() > record.expiresAt) {
      this.otpStore.delete(email);
      return { status: 400, success: false, message: "OTP expired. Please request again." };
    }

    // Check OTP match
    if (record.otp !== enteredOtp) {
      console.log("Entered OTP:", enteredOtp, "Expected OTP:", record.otp);
      return { status: 401, success: false, message: "Invalid OTP. Try again." };
    }

    // OTP is valid → Delete the OTP
    this.otpStore.delete(email);

    // Update user is_active = true
    await userModel.findOneAndUpdate(
      { email },
      { is_active: true, otp: null },
      { new: true }
    );

    return {
      status: 200,
      success: true,
      message: "OTP verified successfully. Account is now active."
    };

  } catch (err) {
    console.error("OTP VERIFY ERROR:", err);
    return { status: 500, success: false, message: "Internal Server Error" };
  }
}

// ------------------------------
// CHANGE PASSWORD
// ------------------------------
async changePassword(userId, oldPassword, newPassword) {
  try {
    // 1️⃣ Find user
    const user = await userModel.findById(userId);
    if (!user) {
      return { status: 404, message: "User not found" };
    }

    // 2️⃣ Verify old password
    const isMatch = await argon2.verify(user.password, oldPassword);
    if (!isMatch) {
      return { status: 400, message: "Old password is incorrect" };
    }

    // 3️⃣ Hash new password
    const hashedPassword = await argon2.hash(newPassword);

    // 4️⃣ Save new password
    user.password = hashedPassword;
    await user.save();

    return {
      status: 200,
      message: "Password updated successfully",
    };
  } catch (error) {
    console.error("CHANGE PASSWORD ERROR:", error);
    return { status: 500, message: "Internal Server Error" };
  }
}

// ------------------------------
// FORGOT PASSWORD - SEND OTP
// ------------------------------
async forgotPasswordService(email) {
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return { status: 404, message: "User not found" };
    }

    const OTP = this.generateOTP();

    // Save OTP temporarily
    this.otpStore.set(email, {
      otp: OTP,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
    });

    // Delete OTP after 5 minutes
    setTimeout(() => this.otpStore.delete(email), 5 * 60 * 1000);

    // SEND OTP EMAIL
    // await sendOTPEmail(email, OTP).catch(() => {});
await sendForgotPasswordOTPEmail(email, OTP).catch(() => {});

    return {
      status: 200,
      message: "OTP sent to your email for password reset",
    };

  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);
    return { status: 500, message: "Internal Server Error" };
  }
}

// ------------------------------
// RESET PASSWORD USING OTP
// ------------------------------
async resetPasswordService(email, enteredOtp, newPassword) {
  try {
    const otpRecord = this.otpStore.get(email);

    if (!otpRecord) {
      return { status: 400, message: "OTP expired or invalid" };
    }

    // Verify OTP
    if (otpRecord.otp !== enteredOtp) {
      return { status: 401, message: "Incorrect OTP" };
    }

    // OTP valid → delete it
    this.otpStore.delete(email);

    // Hash new password
    const hashedPassword = await argon2.hash(newPassword);

    // Update password in DB
    await userModel.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    return {
      status: 200,
      message: "Password reset successful",
    };

  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error);
    return { status: 500, message: "Internal Server Error" };
  }
}


  // ============================
  // GET USERS BY ROLE
  // ============================
  async getUsersByRole(roleId) {
    try {
      const users = await userModel
        .find({ role_id: roleId })
        .select("-password")
        .populate("role_id", "role_name");

      return {
        status: 200,
        message: "Users fetched successfully",
        data: users
      };
    } catch (error) {
      console.error("Service Error (getUsersByRole):", error);
      return {
        status: 500,
        message: "Internal Server Error"
      };
    }
  }


  // ------------------------------
  // LOGIN
  // ------------------------------
  async loginUser(email) {
    return await userModel.findOne({ email });
  }

  // ------------------------------
  // GET ALL USERS
  // ------------------------------
  // async getAllUsers() {
  //   return await userModel
  //   .find().populate("role_id admin_id subAdmin_id");
  // }
  async getAllUsers() {
  // 1️⃣ Get admin role ID
  const adminRole = await roleModel.findOne({ name: "admin" }).select("_id");

  // 2️⃣ Fetch users except admin role
  const users = await userModel
    .find({
      role_id: { $ne: adminRole._id } // ❌ exclude admin users
    })
    .select("-password -otp")
    .populate("role_id subAdmin_id");

  return users;
}


  // ------------------------------
  // GET BY ID
  // ------------------------------
  async getUserById(id) {
    return await userModel.findById(id).populate("role_id admin_id subAdmin_id");
  }

  // ------------------------------
  // UPDATE
  // ------------------------------
  async updateUser(id, data) {
    const user = await userModel.findById(id);
    if (!user) return null;

    Object.assign(user, data);
    await user.save();
    return user;
  }

  // ------------------------------
  // DELETE
  // ------------------------------
  // async deleteUser(id) {
  //   return await userModel.findByIdAndDelete(id);
  // }
  async deleteUser(id) {
  try {
    // 1️⃣ Find user first
    const user = await userModel.findById(id);
    if (!user) return null;

    // 2️⃣ Delete image if exists
    if (user.image && fs.existsSync(user.image)) {
      fs.unlinkSync(user.image);
    }

    // 3️⃣ Delete resume if exists
    if (user.Resume && fs.existsSync(user.Resume)) {
      fs.unlinkSync(user.Resume);
    }

    // 4️⃣ Delete user from DB
    await userModel.findByIdAndDelete(id);

    return { success: true };

  } catch (error) {
    console.error("DELETE USER ERROR:", error);
    throw error;
  }
}

}
// const userService = new UserService();

export default new UserService();
