import express from "express";
import regionController from "../controller/regionController.js";

const router = express.Router();

router.post("/create", (req, res) => regionController.createRegion(req, res));
router.get("/getall", (req, res) => regionController.getAllRegions(req, res));
router.get("/getby/:id", (req, res) => regionController.getRegionById(req, res));
router.put("/update/:id", (req, res) => regionController.updateRegion(req, res));
router.delete("/delete/:id", (req, res) => regionController.deleteRegion(req, res));

export default router;
