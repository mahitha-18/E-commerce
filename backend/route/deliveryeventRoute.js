import express from "express";
import DeliveryEventController from "../controller/deliveryeventController.js";

const router = express.Router();

router.post("/create", DeliveryEventController.create);
router.get("/getall", DeliveryEventController.getAll);
router.get("/getby/:id", DeliveryEventController.getById);
router.put("/update/:id", DeliveryEventController.update);
router.delete("/delete/:id", DeliveryEventController.delete);

export default router;
