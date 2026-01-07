import ReviewService from "../service/reviewService.js";

class ReviewController {
  static async create(req, res) {
    try {
      const review = await ReviewService.create(req.body);
      res.status(201).json({
        message: "Review created successfully",
        data: review
      });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(409).json({
          message: "Duplicate review not allowed for this order/product"
        });
      }
      res.status(500).json({ message: error.message });
    }
  }

  static async getAll(req, res) {
    const reviews = await ReviewService.findAll();
    res.json({ data: reviews });
  }

  static async getById(req, res) {
    const review = await ReviewService.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json({ data: review });
  }

  static async update(req, res) {
    try {
      const review = await ReviewService.update(req.params.id, req.body);
      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }
      res.json({
        message: "Review updated successfully",
        data: review
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async delete(req, res) {
    const review = await ReviewService.delete(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json({ message: "Review deleted successfully" });
  }
}

export default ReviewController;
