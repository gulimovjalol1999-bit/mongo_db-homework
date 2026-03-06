const multer = require("multer");
const fs = require("fs");
const path = require("path");

const audioStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const existsFile = "upload/audio";

    if (!fs.existsSync(existsFile)) {
      fs.mkdirSync(existsFile, { recursive: true });
    }

    cb(null, existsFile);
  },
  filename: (req, file, cb) => {
    const uniqueSuffex = `audio-${Date.now()}${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);

    cb(null, `${uniqueSuffex}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /mp3|wav|flac|aac|m4a|ogg|aiff|dsd|mpeg|occ|opus/;

  const extTypes = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );

  if (extTypes) {
    cb(null, true);
  } else {
    cb(new Error("Not allowed file type"));
  }
};

const upload = multer({
  storage: audioStorage,
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter
});

module.exports = upload;
