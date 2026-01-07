import regionService from "../service/regionService.js";

class RegionController {
  async createRegion(req, res) {
    try {
      const result = await regionService.create(req.body);
      return res
        .status(201)
        .json({ message: "Region created successfully", data: result });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Failed to create region", error: error.message });
    }
  }

  async getAllRegions(req, res) {
    try {
      const regions = await regionService.getAll();
      return res
        .status(200)
        .json({ message: "Regions fetched successfully", data: regions });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to fetch regions", error: error.message });
    }
  }

  async getRegionById(req, res) {
    try {
      const region = await regionService.getById(req.params.id);

      if (!region)
        return res
          .status(404)
          .json({ message: "Region not found", data: null });

      return res
        .status(200)
        .json({ message: "Region fetched successfully", data: region });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to fetch region", error: error.message });
    }
  }

  async updateRegion(req, res) {
    try {
      const updated = await regionService.update(req.params.id, req.body);

      if (!updated)
        return res
          .status(404)
          .json({ message: "Region not found to update", data: null });

      return res
        .status(200)
        .json({ message: "Region updated successfully", data: updated });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Failed to update region", error: error.message });
    }
  }

  async deleteRegion(req, res) {
    try {
      const deleted = await regionService.delete(req.params.id);

      if (!deleted)
        return res
          .status(404)
          .json({ message: "Region not found to delete" });

      return res
        .status(200)
        .json({ message: "Region deleted successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to delete region", error: error.message });
    }
  }
}

export default new RegionController();
