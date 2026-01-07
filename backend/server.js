// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import userRoute from "./route/userRoute.js";
import roleRoute from "./route/roleRoute.js";
import addressRoute from "./route/addressRoute.js";
import vendorRoute from "./route/vendorRoute.js";
import regionRoute from "./route/regionRoute.js";
import storeRoute from "./route/storeRoute.js";
import vendorOutletRoute from "./route/vendoroutletRoute.js";
import cartRoute from "./route/cartRoute.js";
import categoryRoute from "./route/categoryRoute.js";
import subcategoryRoute from "./route/subcategoryRoute.js";
import productRoute from "./route/productRoute.js";
import productVariantRoute from "./route/productvariantRoute.js";
import inventoryRoute from "./route/inventoryRoute.js";
import cartItemRoute from "./route/cartitemRoute.js";
import productImageRoute from "./route/productImageRoute.js";
import orderRoute from "./route/orderRoute.js";
import couponRoute from "./route/couponRoute.js";
import orderItemRoute from "./route/orderitemRoute.js";
import orderStatusHistoryRoute from "./route/orderstatushistoryRoute.js";
import couponRedemptionRoute from "./route/couponredemptionRoute.js";
import deliveryPartnerRoute from "./route/deliverypartnerRoute.js";
import paymentRoute from "./route/paymentRoute.js";
import refundRoute from "./route/refundRoute.js";
import deliveryAssignmentRoute from "./route/deliveryassignmentRoute.js";
import deliveryEventRoute from "./route/deliveryeventRoute.js";
import reviewRoute from "./route/reviewRoute.js";
import favoriteRoute from "./route/favouriteRoute.js";


dotenv.config();

const app = express();

/* Middlewares */
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

/* Routes */
app.use("/api/users", userRoute);
app.use("/api/roles", roleRoute);
app.use("/uploads", express.static("uploads"));
app.use("/api/addresses", addressRoute);
app.use("/api/vendors", vendorRoute);
app.use("/api/regions", regionRoute);
app.use("/api/stores", storeRoute);
app.use("/api/vendoroutlets", vendorOutletRoute);
app.use("/api/carts", cartRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/subcategories", subcategoryRoute);
app.use("/api/products", productRoute);
app.use("/api/productvariants", productVariantRoute);
app.use("/api/inventory", inventoryRoute);
app.use("/api/cartitems", cartItemRoute);
app.use("/api/productimages", productImageRoute);
app.use("/api/orders", orderRoute);
app.use("/api/coupons", couponRoute);
app.use("/api/orderitems", orderItemRoute);
app.use("/api/orderstatushistory", orderStatusHistoryRoute);
app.use("/api/couponredemptions", couponRedemptionRoute);
app.use("/api/deliverypartners", deliveryPartnerRoute);
app.use("/api/payments", paymentRoute);
app.use("/api/refunds", refundRoute);
app.use("/api/deliveryassignments", deliveryAssignmentRoute);
app.use("/api/deliveryevents", deliveryEventRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/favorites", favoriteRoute);


app.get("/", (req, res) => {
  res.send("API is running...");
});

/* MongoDB Connection */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

/* Start Server */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
