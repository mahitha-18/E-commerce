import Favorite from "../model/favouriteModel.js";

class FavoriteService {
  static async create(data) {
    return await Favorite.create(data);
  }

  static async findOne(filter) {
    return await Favorite.findOne(filter);
  }

  static async findAll(filter = {}) {
    return await Favorite.find(filter);
  }

  static async findById(id) {
    return await Favorite.findById(id);
  }

  static async update(id, data) {
    return await Favorite.findByIdAndUpdate(id, data, { new: true });
  }

  static async delete(id) {
    return await Favorite.findByIdAndDelete(id);
  }
}

export default FavoriteService;
