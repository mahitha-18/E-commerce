import VendorOutletService from "../service/vendoroutletService.js";
import VendorOutlet from "../model/vendoroutletModel.js";

class VendorOutletController {

  // CREATE
  async createVendorOutlet(req, res) {
    try {
      const { vendor_id, address_id, name } = req.body;

      // duplicate check directly in controller
      const exists = await VendorOutlet.findOne({ vendor_id, address_id, name });
      if (exists) {
        return res
          .status(400)
          .json({ message: "Vendor outlet already exists" });
      }

      const outlet = await VendorOutletService.create(req.body);
      return res.status(201).json({ message: "Outlet created", data: outlet });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Failed to create outlet", error: error.message });
    }
  }

  // READ ALL
  async getVendorOutlets(req, res) {
    try {
      const outlets = await VendorOutletService.findAll();
      return res.json({ message: "Outlets retrieved", data: outlets });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to retrieve outlets", error: error.message });
    }
  }

  // READ ONE
  async getVendorOutletById(req, res) {
    try {
      const outlet = await VendorOutletService.findById(req.params.id);
      if (!outlet) {
        return res.status(404).json({ message: "Outlet not found" });
      }
      return res.json({ message: "Outlet found", data: outlet });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Invalid outlet ID", error: error.message });
    }
  }

  // UPDATE
  async updateVendorOutlet(req, res) {
    try {
      const { vendor_id, address_id, name } = req.body;
      const existing = await VendorOutletService.findById(req.params.id);

      if (!existing) {
        return res.status(404).json({ message: "Outlet not found" });
      }

      // check duplicate in controller
      const duplicate = await VendorOutlet.findOne({
        vendor_id,
        address_id,
        name,
        _id: { $ne: req.params.id },
      });
      if (duplicate) {
        return res
          .status(400)
          .json({ message: "Vendor outlet already exists" });
      }

      const updated = await VendorOutletService.update(req.params.id, req.body);
      return res.json({ message: "Outlet updated", data: updated });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Failed to update outlet", error: error.message });
    }
  }

  // DELETE
//   async deleteVendorOutlet(req, res) {
//     try {
//       const existing = await VendorOutletService.findById(req.params.id);
//       if (!existing) {
//         return res.status(404).json({ message: "Outlet not found" });
//       }

//       await VendorOutletService.delete(req.params.id);
//       return res.json({ message: "Outlet deleted", data: { id: req.params.id } });
//     } catch (error) {
//       return res
//         .status(400)
//         .json({ message: "Failed to delete outlet", error: error.message });
//     }
//   }
async deleteVendorOutlet(req, res) {
  try {
    const outlet = await VendorOutletService.findById(req.params.id);
    if (!outlet) {
      return res.status(404).json({ message: "Outlet not found" });
    }

    await VendorOutletService.delete(req.params.id);
    return res.json({ message: "Outlet deleted successfully" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Failed to delete outlet", error: error.message });
  }
}

}

export default new VendorOutletController();
