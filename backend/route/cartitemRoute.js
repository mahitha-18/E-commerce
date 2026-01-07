import express from "express";
import CartItemController from "../controller/cartitemController.js";

const router = express.Router();

router.post("/create", CartItemController.create);
router.get("/getall", CartItemController.getAll);
router.get("/getby/:id", CartItemController.getById);
router.get("/cart/:cartId", CartItemController.getByCartId);
router.put("/update/:id", CartItemController.update);
router.delete("/delete/:id", CartItemController.delete);

export default router;
