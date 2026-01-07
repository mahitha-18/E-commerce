import express from "express";
import DeliveryPartnerController from "../controller/deliverypartnerController.js";

const router = express.Router();

router.post("/create", DeliveryPartnerController.create);
router.get("/getall", DeliveryPartnerController.getAll);
router.get("/getby/:id", DeliveryPartnerController.getById);
router.put("/update/:id", DeliveryPartnerController.update);
router.patch("/:id/location", DeliveryPartnerController.updateLocation);
router.delete("/delete/:id", DeliveryPartnerController.delete);

export default router;
