const multer = require('multer')
const path = require("path");
const express = require('express')
const { Router } = express;

// {
//  name
//  tipo
// }
const mascotas = []

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/img'))
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

const upload = multer({ storage })
const router = new Router();

router.get('/', (req, res) => {
  res.cookie('name', 'express').sendFile(path.join(__dirname, '../public/index.html'))
})

router.get('/mascotas', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/nueva.html'))
})


router.post('/mascotas', upload.single("img"), (req, res) => {
  if (req.file) {
    console.log("tenemos file")
  }
  console.log(JSON.stringify(req.body))
  res.redirect('/')
})

router.post('/mascotas/multiple', upload.array("img", 2), (req, res) => {
  if (req.files) {
    console.log("tenemos file")
  }
  console.log(JSON.stringify(req.body))
  res.redirect('/')
})


module.exports = router