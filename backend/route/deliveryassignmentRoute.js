import express from "express";
import DeliveryAssignmentController from "../controller/deliveryassignmentController.js";

const router = express.Router();

router.post("/create", DeliveryAssignmentController.create);
router.get("/getall", DeliveryAssignmentController.getAll);
router.get("/getby/:id", DeliveryAssignmentController.getById);
router.put("/update/:id", DeliveryAssignmentController.update);
router.delete("/delete/:id", DeliveryAssignmentController.delete);

export default router;
