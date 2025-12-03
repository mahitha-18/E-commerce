import express from "express";
import RoleController from "../controller/roleController.js";

const router = express.Router();

router.post("/create", RoleController.create);
router.get("/getall", RoleController.getAll);
router.get("/getby/:id", RoleController.getById);
router.put("/update/:id", RoleController.update);
router.delete("/delete/:id", RoleController.delete);

export default router;
