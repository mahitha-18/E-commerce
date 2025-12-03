import User from "../model/userModel.js";

class UserService {

  // CREATE
  async createUser(data) {
    return await User.create(data);
  }

  // LOGIN (email + password)
  async loginUser(email) {
    return await User.findOne({ email });
  }

  // GET ALL USERS
  async getAllUsers() {
    return await User.find().populate("role_id admin_id subAdmin_id");
  }

  // GET BY ID
  async getUserById(id) {
    return await User.findById(id).populate("role_id admin_id subAdmin_id");
  }

  // UPDATE
  async updateUser(id, data) {
    return await User.findByIdAndUpdate(id, data, { new: true });
  }

  // DELETE
  async deleteUser(id) {
    return await User.findByIdAndDelete(id);
  }

// GENERATE OTP
  async generateOTP(userId) {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    const user = await User.findByIdAndUpdate(
      userId,
      {
        otp,
        otp_expires_at: expiresAt
      },
      { new: true }
    );

    return { otp, user };
  }

  // VERIFY OTP
  async verifyOTP(userId, otp) {
    const user = await User.findById(userId);

    if (!user) return { success: false, message: "User not found" };

    if (!user.otp) return { success: false, message: "OTP not generated" };

    if (user.otp !== otp)
      return { success: false, message: "Invalid OTP" };

    if (user.otp_expires_at < new Date())
      return { success: false, message: "OTP expired" };

    // clear OTP after success
    user.otp = null;
    user.otp_expires_at = null;
    await user.save();

    return { success: true, message: "OTP verified successfully" };
  }
}
export default new UserService();
