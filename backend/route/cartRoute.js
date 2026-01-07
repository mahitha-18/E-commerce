import express from "express";
import cartController from "../controller/cartController.js";

const router = express.Router();

// CREATE
router.post("/create", cartController.createCart);

// READ ALL
router.get("/getall", cartController.getCarts);

// READ ONE
router.get("/getby/:id", cartController.getCartById);

// UPDATE
router.put("/update/:id", cartController.updateCart);

// DELETE
router.delete("/delete/:id", cartController.deleteCart);

export default router;
