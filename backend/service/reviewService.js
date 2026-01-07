import Review from "../model/reviewModel.js";

class ReviewService {
  static async create(data) {
    return await Review.create(data);
  }

  static async findAll(filter = {}) {
    return await Review.find(filter);
  }

  static async findById(id) {
    return await Review.findById(id);
  }

  static async update(id, data) {
    return await Review.findByIdAndUpdate(id, data, { new: true });
  }

  static async delete(id) {
    return await Review.findByIdAndDelete(id);
  }
}

export default ReviewService;
