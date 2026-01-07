import express from "express";
import InventoryController from "../controller/inventoryController.js";

const router = express.Router();

router.post("/create", InventoryController.create);
router.get("/getall", InventoryController.getAll);
router.get("/getby/:id", InventoryController.getById);
router.put("/update/:id", InventoryController.update);
router.delete("/delete/:id", InventoryController.delete);

export default router;
