import express from "express";
import FavoriteController from "../controller/favouriteController.js";

const router = express.Router();

router.post("/create", FavoriteController.create);
router.get("/getall", FavoriteController.getAll);
router.get("/getby/:id", FavoriteController.getById);
router.put("/update/:id", FavoriteController.update);
router.delete("/delete/:id", FavoriteController.delete);

export default router;
