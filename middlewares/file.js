const multer = require('multer')
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/img"))
  },
  filename: (req, file, cb) => {
    // img-212124324546
    cb(null, file.fieldname + "-" + Date.now())
  }
})

const upload = multer({ storage })

module.exports = upload