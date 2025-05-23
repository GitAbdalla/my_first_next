import multer from 'multer';
import path from 'path';
import fs from 'fs';


const uploadDir = path.join(process.cwd(), 'public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '_' + file.originalname),
});

const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  upload.single('image')(req, res, function (err) {
    if (err) return res.status(500).json({ error: 'Upload failed' });

    const { name, email } = req.body;
    const image = `/uploads/${req.file.filename}`;

    return res.status(200).json({ name, email, image });
  });
}
