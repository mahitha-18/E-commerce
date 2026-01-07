import express from "express";
import AddressController from "../controller/addressController.js";

const router = express.Router();

// CREATE ADDRESS
router.post("/create", AddressController.create);
router.get("/getall", AddressController.getAll);

// GET ALL ADDRESSES OF A USER
// router.get("/user/:userId", AddressController.getByUser);

// GET ADDRESS BY ID
router.get("/getby/:id", AddressController.getById);

// UPDATE ADDRESS
router.put("/update/:id", AddressController.update);

// DELETE ADDRESS
router.delete("/delete/:id", AddressController.delete);

export default router;
