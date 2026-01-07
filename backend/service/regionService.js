import Region from "../model/regionModel.js";

class RegionService {
  async create(data) {
    return await new Region(data).save();
  }

  async getAll() {
    return await Region.find();
  }

  async getById(id) {
    return await Region.findById(id);
  }

  async update(id, data) {
    return await Region.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Region.findByIdAndDelete(id);
  }
}

export default new RegionService();
