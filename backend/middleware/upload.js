// import multer from "multer";
// import path from "path";
// import fs from "fs";

// const allowedImageTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
// const allowedResumeTypes = [
//   "application/pdf",
//   "application/msword",
//   "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
// ];

// // ✅ Ensure directory exists
// const uploadDir = "uploads/subcategories";
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }
// // Store files in memory only, not on disk yet
// // const storage = multer.memoryStorage();


// // const fileFilter = (req, file, cb) => {
// //   // ✅ Category / Sub-category / Logo / Product images
// //   if (
// //     (
// //       file.fieldname === "image" ||           // category, sub-category
// //       file.fieldname === "logo_url" ||        // logo
// //       file.fieldname === "product_image"  // product (single)
// //       // file.fieldname === "product_image"     // product (multiple)
// //     ) &&
// //     !allowedImageTypes.includes(file.mimetype)
// //   ) {
// //     return cb(new Error("Invalid image type"), false);
// //   }
// // // const fileFilter = (req, file, cb) => {
// // //   if (
// // //     (file.fieldname === "image" || file.fieldname === "logo_url") &&
// // //     !allowedImageTypes.includes(file.mimetype)
// // //   ) {
// // //     return cb(new Error("Invalid image type"));
// // //   }

//   if (
//     file.fieldname === "Resume" &&
//     !allowedResumeTypes.includes(file.mimetype)
//   ) {
//     return cb(new Error("Invalid resume type"));
//   }

//   cb(null, true);
// // };
// const fileFilter = (req, file, cb) => {
//   // ✅ ALLOWED IMAGE FIELDS (FIXED)
//   const imageFields = [
//     "image",          // category, sub-category
//     "logo_url",       // logo
//     "product_image",  // product (single + multiple)
//   ];

//   if (imageFields.includes(file.fieldname)) {
//     if (!allowedImageTypes.includes(file.mimetype)) {
//       return cb(new Error("Invalid image type"), false);
//     }
//     return cb(null, true);
//   }
// }
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`
//     );
//   },
// });

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 },
// });

// export default upload;
// export { allowedImageTypes, allowedResumeTypes };

// import multer from "multer";
// import path from "path";
// import fs from "fs";

// const allowedImageTypes = [
//   "image/jpeg",
//   "image/png",
//   "image/jpg",
//   "image/webp",
// ];

// const allowedResumeTypes = [
//   "application/pdf",
//   "application/msword",
//   "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
// ];

// // 🔹 Base upload folder
// const baseUploadDir = "uploads";

// // 🔹 Ensure directories exist
// const ensureDir = (dir) => {
//   if (!fs.existsSync(dir)) {
//     fs.mkdirSync(dir, { recursive: true });
//   }
// };

// ensureDir(baseUploadDir);
// ensureDir(`${baseUploadDir}/subcategories`);
// ensureDir(`${baseUploadDir}/products`);


// // ========================
// // FILE FILTER (EXTENDED)
// // ========================
// const fileFilter = (req, file, cb) => {
//   // Image fields
//   const imageFields = [
//     "image",
//     "logo_url",
//     "subcategory_images",
//     "product_image",      // ✅ ADDED
//     "product_images",     // ✅ OPTIONAL (future use)
//   ];

//   if (imageFields.includes(file.fieldname)) {
//     if (!allowedImageTypes.includes(file.mimetype)) {
//       return cb(new Error("Invalid image type"), false);
//     }
//     return cb(null, true);
//   }

//   // Resume upload
//   if (file.fieldname === "Resume") {
//     if (!allowedResumeTypes.includes(file.mimetype)) {
//       return cb(new Error("Invalid resume type"), false);
//     }
//     return cb(null, true);
//   }

//   cb(new Error("Unsupported file field"), false);
// };


// // ========================
// // STORAGE (DYNAMIC FOLDER)
// // ========================
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     let uploadPath = baseUploadDir;

//     if (file.fieldname === "subcategory_images") {
//       uploadPath = `${baseUploadDir}/subcategories`;
//     } else if (
//       file.fieldname === "product_image" ||
//       file.fieldname === "product_images"
//     ) {
//       uploadPath = `${baseUploadDir}/products`;
//     }

//     ensureDir(uploadPath);
//     cb(null, uploadPath);
//   },

//   filename: (req, file, cb) => {
//     cb(
//       null,
//       `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`
//     );
//   },
// });

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
// });

// export default upload;
// export { allowedImageTypes, allowedResumeTypes };

import multer from "multer";
import path from "path";
import fs from "fs";

/* ================== ALLOWED TYPES ================== */

const allowedImageTypes = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
];

const allowedResumeTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

/* ================== FIELD → FOLDER MAP ================== */

const FIELD_FOLDER_MAP = {
  image: "uploads/image",
  logo_url: "uploads/logo_url",
  categories: "uploads/categories",
  subcategories: "uploads/subcategories",
  product_image: "uploads/product_image",
  vendors: "uploads/vendors",
Resume: "uploads/resume",
};

/* ================== FILE FILTER ================== */

const fileFilter = (req, file, cb) => {
  const uploadPath = FIELD_FOLDER_MAP[file.fieldname];

  // ❌ Reject unknown fields
  if (!uploadPath) {
    return cb(new Error(`Unexpected field: ${file.fieldname}`), false);
  }

  // 📸 Image validation
  if (file.fieldname !== "Resume") {
    if (!allowedImageTypes.includes(file.mimetype)) {
      return cb(new Error("Invalid image type"), false);
    }
  }

  // 📄 Resume validation
  if (
    file.fieldname === "Resume" &&
    !allowedResumeTypes.includes(file.mimetype)
  ) {
    return cb(new Error("Invalid resume type"), false);
  }

  cb(null, true);
};

/* ================== STORAGE ================== */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = FIELD_FOLDER_MAP[file.fieldname];

    // Ensure directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(
        file.originalname
      )}`
    );
  },
});

/* ================== MULTER INSTANCE ================== */

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

export default upload;
export { allowedImageTypes, allowedResumeTypes };
