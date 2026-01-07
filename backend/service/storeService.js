// import Store from "../model/storeModel.js";

// class StoreService {
//   async create(data) {
//     return await new Store(data).save();
//   }

//   async getAll() {
//     return await Store.find().populate("region_id");
//   }

//   async getById(id) {
//     return await Store.findById(id).populate("region_id");
//   }

//   async update(id, data) {
//     return await Store.findByIdAndUpdate(id, data, { new: true });
//   }

//   async delete(id) {
//     return await Store.findByIdAndDelete(id);
//   }
// }

// export default new StoreService();
import mongoose from "mongoose";    
import Store from "../model/storeModel.js";
class StoreService {
  async createStore(data) {
    try {
      const store = await Store.create(data);
      return {
        status: 201,
        message: "Store created successfully",
        data: store,
      };
    } catch (error) {
      console.error("CREATE STORE ERROR:", error);
      return { status: 500, message: "Internal Server Error" };
    }
  }

  async getAllStores() {
    try {
      const stores = await Store.find().populate("region_id");
      return {
        status: 200,
        message: "Stores fetched successfully",
        data: stores,
      };
    } catch (error) {
      console.error("GET ALL STORES ERROR:", error);
      return { status: 500, message: "Internal Server Error" };
    }
  }

  async getStoreById(id) {
    try {
      const store = await Store.findById(id).populate("region_id");
      if (!store) return { status: 404, message: "Store not found", data: null };

      return {
        status: 200,
        message: "Store fetched successfully",
        data: store,
      };
    } catch (error) {
      console.error("GET STORE BY ID ERROR:", error);
      return { status: 500, message: "Internal Server Error" };
    }
  }

//   async getStoresByRegion(regionId) {
//     try {
//       const stores = await Store.find({ region_id: regionId }).populate("region_id");
//       return {
//         status: 200,
//         message: "Stores fetched by region successfully",
//         data: stores,
//       };
//     } catch (error) {
//       console.error("GET STORES BY REGION ERROR:", error);
//       return { status: 500, message: "Internal Server Error" };
//     }
//   }

async getStoresByRegion(regionId) {
     // Validate ObjectId first
    if (!mongoose.Types.ObjectId.isValid(regionId)) {
      return {
        status: 400,
        message: "Invalid region ID",
        data: null
      };
    }
  try {
    const stores = await Store.find({ region_id: regionId }).populate("region_id");

    if (!stores || stores.length === 0) {
      return {
        status: 200,
        message: "No stores available for this region",
        data: [],
      };
    }

    return {
      status: 200,
      message: "Stores fetched by region successfully",
      data: stores,
    };
  } catch (error) {
    console.error("GET STORES BY REGION ERROR:", error);
    return { status: 500, message: "Internal Server Error" };
  }
}


  async updateStore(id, data) {
    try {
      const store = await Store.findById(id);
      if (!store) return { status: 404, message: "Store not found", data: null };

      Object.assign(store, data);
      const updated = await store.save();
      return {
        status: 200,
        message: "Store updated successfully",
        data: updated,
      };
    } catch (error) {
      console.error("UPDATE STORE ERROR:", error);
      return { status: 500, message: "Internal Server Error" };
    }
  }

  async deleteStore(id) {
    try {
      const store = await Store.findByIdAndDelete(id);
      if (!store) return { status: 404, message: "Store not found" };

      return { status: 200, message: "Store deleted successfully" };
    } catch (error) {
      console.error("DELETE STORE ERROR:", error);
      return { status: 500, message: "Internal Server Error" };
    }
  }
}

export default new StoreService();
