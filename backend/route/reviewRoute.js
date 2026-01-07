import express from "express";
import ReviewController from "../controller/reviewController.js";

const router = express.Router();

router.post("/create", ReviewController.create);
router.get("/getall", ReviewController.getAll);
router.get("/getby/:id", ReviewController.getById);
router.put("/update/:id", ReviewController.update);
router.delete("/delete/:id", ReviewController.delete);

export default router;
