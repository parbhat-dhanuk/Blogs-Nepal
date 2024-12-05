import multer from 'multer';
import path from 'path';
import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});




// // File size limit (2MB)
const MAX_SIZE = 2 * 1024 * 1024;

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// File type validation
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extname) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid image type. Only JPEG, PNG, and GIF are allowed.')); // Reject the file
  }
};

const upload = multer({
  storage,
  limits: { fileSize: MAX_SIZE },
  fileFilter
})
.single('image'); // Handling single image file uploads


const uploadImage = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
      // Multer-specific error for file size limit
      return res.status(400).json({ error: 'File size exceeds 2MB limit' });
    } else if (err) {
      // Other errors (e.g., invalid file type)
      return res.status(400).json({ error: err.message });
    }
    next(); // Proceed if no error
  });
};

export { uploadImage,cloudinary };