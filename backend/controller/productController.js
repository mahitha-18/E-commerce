import Product from "../model/productModel.js";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import ProductService from "../service/productService.js";

class ProductController {
  // CREATE PRODUCT
  async create(req, res) {
    try {
      // const imageUrls = req.file ? req.file.path : null;
const imageUrls = req.files?.map(file => file.path) || [];

      const product = await ProductService.create({
        ...req.body,
        image_url: imageUrls,
      });

      return res.status(201).json({
        message: "Product created successfully",
        data: product,
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        message: error.message,
      });
    }
  }

  // GET ALL
  async getAll(req, res) {
    try {
      const products = await ProductService.getAll();
      return res.json({
        message: products.length
          ? "Products fetched successfully"
          : "No products found",
        data: products,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // GET BY ID
  async getById(req, res) {
    try {
      const product = await ProductService.getById(req.params.id);
      return res.json({
        message: "Product fetched successfully",
        data: product,
      });
    } catch (error) {
      return res.status(error.status || 400).json({
        message: error.message,
      });
    }
  }

  // UPDATE PRODUCT
//   async update(req, res) {
//   try {
//     const productId = req.params.id;

//     // 1️⃣ Get existing product
//     const existingProduct = await ProductService.getById(productId);

//     if (!existingProduct) {
//       return res.status(404).json({
//         message: "Product not found",
//       });
//     }

//     let imageUrls;

//     // 2️⃣ If new images uploaded
//     if (req.files && req.files.length > 0) {
//       imageUrls = req.files.map((file) => file.path);

//       // 3️⃣ Delete old images
//       if (
//         existingProduct.image_urls &&
//         existingProduct.image_urls.length > 0
//       ) {
//         existingProduct.image_urls.forEach((oldImage) => {
//           fs.unlink(oldImage, (err) => {
//             if (err) {
//               console.error(
//                 "Failed to delete old image:",
//                 err.message
//               );
//             }
//           });
//         });
//       }
//     }

//     // 4️⃣ Prepare update payload
//     const updateData = {
//       ...req.body,
//       ...(imageUrls && { image_urls: imageUrls }),
//     };

//     // 5️⃣ Update DB
//     const updatedProduct = await ProductService.update(
//       productId,
//       updateData
//     );

//     return res.status(200).json({
//       message: imageUrls
//         ? "Product and images updated successfully"
//         : "Product updated successfully",
//       data: updatedProduct,
//     });
//   } catch (error) {
//     return res.status(error.status || 500).json({
//       message: error.message || "Failed to update product",
//     });
//   }
// }

// async update(req, res) {
//   try {
//     // 1️⃣ Find product
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     /* -----------------------------------
//        2️⃣ DUPLICATE CHECK
//        (example: name under same category)
//     ----------------------------------- */
//     if (req.body.name) {
//       const duplicate = await Product.findOne({
//         _id: { $ne: req.params.id },
//         name: req.body.name.trim(),
//         category_id: product.category_id,
//       });

//       if (duplicate) {
//         return res.status(409).json({
//           message: "Product name already exists under this category",
//         });
//       }
//     }

//     /* -----------------------------------
//        3️⃣ REPLACE IMAGES (MULTI FILE ONLY)
//     ----------------------------------- */
//     if (req.files?.product_image?.length > 0) {
//       // delete old images from disk
//       product.image_urls.forEach((img) => {
//         if (fs.existsSync(img)) fs.unlinkSync(img);
//       });

//       // replace DB image paths
//       product.image_urls = req.files.product_image
//         .map((f) => f?.path)
//         .filter(Boolean);
//     }

//     /* -----------------------------------
//        4️⃣ UPDATE OTHER FIELDS SAFELY
//     ----------------------------------- */

//     if (req.body.is_active !== undefined) {
//       product.is_active = req.body.is_active === "true";
//     }

//     product.name = req.body.name ?? product.name;
//     product.description = req.body.description ?? product.description;
//     product.price = req.body.price ?? product.price;
//     product.category_id = req.body.category_id ?? product.category_id;

//     /* -----------------------------------
//        5️⃣ NO-CHANGE DETECTION (OPTIONAL BUT RECOMMENDED)
//     ----------------------------------- */
//     if (
//       !req.body.name &&
//       !req.body.description &&
//       !req.body.price &&
//       !req.body.category_id &&
//       req.body.is_active === undefined &&
//       !req.files?.product_image?.length
//     ) {
//       return res.status(400).json({
//         message: "No fields changed to update",
//       });
//     }

//     // 6️⃣ Save
//     await product.save();

//     return res.status(200).json({
//       message: "Product updated successfully",
//       data: product,
//     });

//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// }


async update(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    /* ---------------- DUPLICATE CHECK ---------------- */
    if (req.body.name) {
      const duplicate = await Product.findOne({
        _id: { $ne: req.params.id },
        name: req.body.name.trim(),
        store_id: product.store_id,
      });

      if (duplicate) {
        return res.status(409).json({
          message: "Product name already exists in this store",
        });
      }
    }

    /* ---------------- IMAGE REPLACEMENT ---------------- */
    if (Array.isArray(req.files) && req.files.length > 0) {
      // delete old images
      if (product.image_url?.length) {
        product.image_url.forEach((img) => {
          if (fs.existsSync(img)) fs.unlinkSync(img);
        });
      }

      // save new images
      product.image_url = req.files.map((file) => file.path);
    }
    // 🚫 DO NOTHING if no files uploaded

    /* ---------------- OTHER FIELDS ---------------- */
    product.name = req.body.name ?? product.name;
    product.description = req.body.description ?? product.description;
    product.base_price = req.body.base_price ?? product.base_price;
    product.category_id = req.body.category_id ?? product.category_id;
    product.subcategory_id =
      req.body.subcategory_id ?? product.subcategory_id;

    if (req.body.is_active !== undefined) {
      product.is_active = req.body.is_active === "true";
    }

    await product.save();

    return res.status(200).json({
      message: "Product updated successfully",
      data: product, // ✅ image_url WILL SHOW
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// async update(req, res) {
//   try {
//     const productId = req.params.id;

//     // 1️⃣ Fetch existing product
//     const existingProduct = await ProductService.getById(productId);
//     if (!existingProduct) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     // 2️⃣ Prepare safe update object
//     const updateData = {};
//     let hasChanges = false;

//     // 🚫 Never trust image_urls from body
//     const body = { ...req.body };
//     delete body.image_urls;

//     // 3️⃣ Compare NON-image fields
//     for (const key in body) {
//       if (
//         body[key] !== undefined &&
//         body[key] !== String(existingProduct[key])
//       ) {
//         updateData[key] = body[key];
//         hasChanges = true;
//       }
//     }

//     // 4️⃣ Handle image replacement (multi-file only)
//     if (req.files && req.files.length > 0) {
//       const newImageUrls = req.files.map(file => file.path);

//       // Compare image arrays
//       if (
//         JSON.stringify(existingProduct.image_urls) !==
//         JSON.stringify(newImageUrls)
//       ) {
//         updateData.image_urls = newImageUrls;
//         hasChanges = true;
//       }
//     }

//     // 5️⃣ NO CHANGES DETECTED → EXIT
//     if (!hasChanges) {
//       return res.status(400).json({
//         message: "No fields changed to update",
//       });
//     }

//     // 6️⃣ Update DB FIRST
//     const updatedProduct = await ProductService.update(
//       productId,
//       updateData
//     );

//     // 7️⃣ Delete old images ONLY if images were replaced
//     if (updateData.image_urls && existingProduct.image_urls?.length > 0) {
//       existingProduct.image_urls.forEach((oldImage) => {
//         fs.unlink(oldImage, (err) => {
//           if (err) {
//             console.error("Failed to delete old image:", err.message);
//           }
//         });
//       });
//     }

//     return res.status(200).json({
//       message: "Product updated successfully",
//       data: updatedProduct,
//     });

//   } catch (error) {
//     return res.status(error.status || 500).json({
//       message: error.message || "Failed to update product",
//     });
//   }
// }



  // DELETE PRODUCT
  async delete(req, res) {
    try {
      await ProductService.delete(req.params.id);
      return res.json({
        message: "Product deleted successfully",
      });
    } catch (error) {
      return res.status(error.status || 400).json({
        message: error.message,
      });
    }
  }
}

export default new ProductController();
