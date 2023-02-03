import cloudinary from "cloudinary";
import multer from "multer";
import nextConnect from "next-connect";

export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage });

const handler = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

handler.use(upload.single("file"));

cloudinary.config({
  cloud_name: "oasis321",
  api_key: "483278339781337",
  api_secret: "hbra-8uL1Qtux2tGQSKv-Vfy5eo",
});

handler.post(async (req, res) => {
  try {

    console.log(req.file);
    if (!req.file)
      return res.status(400).json({ msg: "no files were uploaded" });

    const file = req.file;
    if (file.size > 1024 * 1024 * 5) {
      return res.status(400).json({ msg: "file size is too big" });
    }

    if (
      file.mimetype !== "image/jpeg" &&
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/png"
    ) {
      return res
        .status(400)
        .json({ msg: "image format should be png or jpeg" });
    }

    cloudinary.v2.uploader.upload(
      file.path,
      { folder: "ecommerce-backend" },
      async (err, result) => {
        if (err) throw err;

        res.json({ public_id: result.public_id, url: result.secure_url });
      }
    );
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default handler;
