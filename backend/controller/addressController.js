import addressService from "../service/addressService.js";

class AddressController {

  // CREATE
  async create(req, res) {
    try {
      const result = await addressService.createAddress(req.body);
      return res.status(result.status).json(result);
    } catch (err) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
// ------------------------------
// GET ALL ADDRESSES
// ------------------------------
async getAll(req, res) {
  try {
    const result = await addressService.getAllAddresses();
    return res.status(result.status).json(result);
  } catch (err) {
    console.error("GET ALL ADDRESSES CONTROLLER ERROR:", err);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
}

  // GET BY USER
//   async getByUser(req, res) {
//     try {
//       const { userId } = req.params;

//       if (!userId) {
//         return res.status(400).json({ message: "User ID is required" });
//       }

//       const result = await addressService.getAddressesByUser(userId);
//       return res.status(result.status).json(result);

//     } catch (err) {
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   }

  // GET BY ID
  async getById(req, res) {
    try {
      const address = await addressService.getAddressById(req.params.id);
      if (!address) {
        return res.status(404).json({ message: "Address not found" });
      }
      res.json(address);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // UPDATE
  async update(req, res) {
    try {
      const address = await addressService.updateAddress(
        req.params.id,
        req.body
      );

      if (!address) {
        return res.status(404).json({ message: "Address not found" });
      }

      res.json({
        message: "Address updated successfully",
        data: address
      });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // DELETE
  async delete(req, res) {
    try {
      const result = await addressService.deleteAddress(req.params.id);
      if (!result) {
        return res.status(404).json({ message: "Address not found" });
      }

      res.json({ message: "Address deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default new AddressController();
