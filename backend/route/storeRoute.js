import express from "express";
import storeController from "../controller/storeController.js";

const router = express.Router();

router.post("/create", (req, res) => storeController.createStore(req, res));
router.get("/getall", (req, res) => storeController.getAllStores(req, res));
router.get("/getby/:id", (req, res) => storeController.getStoreById(req, res));

router.get("/getbyregion/:regionId", storeController.getByRegion);
router.put("/update/:id", (req, res) => storeController.updateStore(req, res));
router.delete("/delete/:id", (req, res) => storeController.deleteStore(req, res));

export default router;
