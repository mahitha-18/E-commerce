import Category from "../model/categoryModel.js";

class CategoryService {
  async create(data) {
    return Category.create(data);
  }

  async findAll() {
    return Category.find().sort({ createdAt: -1 });
  }

  async findById(id) {
    return Category.findById(id);
  }

  async findByName(name) {
    return Category.findOne({ name: name.trim() });
  }

  async update(id, data) {
    return Category.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return Category.findByIdAndDelete(id);
  }
}

export default new CategoryService();
