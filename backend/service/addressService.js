import Address from "../model/addressModel.js";

class AddressService {

  // ------------------------------
  // CREATE ADDRESS
  // ------------------------------
  async createAddress(data) {
    try {
      // If is_default = true → unset previous default address
      if (data.is_default === true && data.user_id) {
        await Address.updateMany(
          { user_id: data.user_id },
          { is_default: false }
        );
      }

      const address = await Address.create(data);

      return {
        status: 201,
        message: "Address created successfully",
        data: address
      };
    } catch (error) {
      console.error("CREATE ADDRESS ERROR:", error);
      return { status: 500, message: "Internal Server Error" };
    }
  }
// ------------------------------
// GET ALL ADDRESSES
// ------------------------------
async getAllAddresses() {
  try {
    const addresses = await Address
      .find()
      .populate("user_id", "email phone_number");

    return {
      status: 200,
      message: "Addresses fetched successfully",
      data: addresses
    };
  } catch (error) {
    console.error("GET ALL ADDRESSES ERROR:", error);
    return { status: 500, message: "Internal Server Error" };
  }
}

  // ------------------------------
  // GET ADDRESSES BY USER
  // ------------------------------
//   async getAddressesByUser(userId) {
//     try {
//       const addresses = await Address.find({ user_id: userId });

//       return {
//         status: 200,
//         message: "Addresses fetched successfully",
//         data: addresses
//       };
//     } catch (error) {
//       console.error("GET ADDRESS ERROR:", error);
//       return { status: 500, message: "Internal Server Error" };
//     }
//   }

  // ------------------------------
  // GET ADDRESS BY ID
  // ------------------------------
  async getAddressById(id) {
    return await Address.findById(id);
  }

  // ------------------------------
  // UPDATE ADDRESS
  // ------------------------------
  async updateAddress(id, data) {
    try {
      const address = await Address.findById(id);
      if (!address) return null;

      // Handle default address logic
      if (data.is_default === true && address.user_id) {
        await Address.updateMany(
          { user_id: address.user_id },
          { is_default: false }
        );
      }

      Object.assign(address, data);
      await address.save();

      return address;
    } catch (error) {
      console.error("UPDATE ADDRESS ERROR:", error);
      throw error;
    }
  }

  // ------------------------------
  // DELETE ADDRESS
  // ------------------------------
  async deleteAddress(id) {
    return await Address.findByIdAndDelete(id);
  }
}

export default new AddressService();
