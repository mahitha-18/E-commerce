// import storeService from "../service/storeService.js";

// class StoreController {
//   async createStore(req, res) {
//     try {
//       const result = await storeService.create(req.body);
//       return res
//         .status(201)
//         .json({ message: "Store created successfully", data: result });
//     } catch (error) {
//       return res
//         .status(400)
//         .json({ message: "Failed to create store", error: error.message });
//     }
//   }

//   async getAllStores(req, res) {
//     try {
//       const stores = await storeService.getAll();
//       return res
//         .status(200)
//         .json({ message: "Stores fetched successfully", data: stores });
//     } catch (error) {
//       return res
//         .status(500)
//         .json({ message: "Failed to fetch stores", error: error.message });
//     }
//   }

//   async getStoreById(req, res) {
//     try {
//       const store = await storeService.getById(req.params.id);
//       if (!store)
//         return res
//           .status(404)
//           .json({ message: "Store not found", data: null });

//       return res
//         .status(200)
//         .json({ message: "Store fetched successfully", data: store });
//     } catch (error) {
//       return res
//         .status(500)
//         .json({ message: "Failed to fetch store", error: error.message });
//     }
//   }

//   async updateStore(req, res) {
//     try {
//       const updated = await storeService.update(req.params.id, req.body);
//       if (!updated)
//         return res
//           .status(404)
//           .json({ message: "Store not found to update", data: null });

//       return res
//         .status(200)
//         .json({ message: "Store updated successfully", data: updated });
//     } catch (error) {
//       return res
//         .status(400)
//         .json({ message: "Failed to update store", error: error.message });
//     }
//   }

//   async deleteStore(req, res) {
//     try {
//       const deleted = await storeService.delete(req.params.id);
//       if (!deleted)
//         return res
//           .status(404)
//           .json({ message: "Store not found to delete" });

//       return res
//         .status(200)
//         .json({ message: "Store deleted successfully" });
//     } catch (error) {
//       return res
//         .status(500)
//         .json({ message: "Failed to delete store", error: error.message });
//     }
//   }
// }

// export default new StoreController();


import storeService from "../service/storeService.js";

class StoreController {
  async create(req, res) {
    const result = await storeService.createStore(req.body);
    return res.status(result.status).json(result);
  }

  async getAll(req, res) {
    const result = await storeService.getAllStores();
    return res.status(result.status).json(result);
  }

  async getById(req, res) {
    const result = await storeService.getStoreById(req.params.id);
    return res.status(result.status).json(result);
  }

  async getByRegion(req, res) {
    const result = await storeService.getStoresByRegion(req.params.regionId);
    return res.status(result.status).json(result);
  }

  async update(req, res) {
    const result = await storeService.updateStore(req.params.id, req.body);
    return res.status(result.status).json(result);
  }

  async delete(req, res) {
    const result = await storeService.deleteStore(req.params.id);
    return res.status(result.status).json(result);
  }
}

export default new StoreController();
