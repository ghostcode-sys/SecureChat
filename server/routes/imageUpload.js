const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const express = require("express");

cloudinary.config({
  cloud_name: "dxoigtpex",
  api_key: "723774216561932",
  api_secret: "kzT0HCkLiqBPlcixLH_1Lj1KVEc",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "DEV",
  },
});

const upload = multer({ storage: storage });

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const uploadLocal = multer({ storage: multerStorage });

const route = express.Router();

route.post("/", upload.single("chatimages"), async (req, res) => {
  // console.log(req.file);
  res.json({ path: req.file.path, name: req.file.originalname });
});

route.post("/local", uploadLocal.single("chatimages"), async (req, res) => {
  // console.log(req);
  res.json({ path: req.file.path, name: req.file.filename });
});

module.exports = route;
