const multer = require('multer')
const express = require('express');
const tools = require('../../tools/index')
var Jimp = require('jimp');
const app = express()
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const user = require('../../models/user');
const EM = require('./email');
const checkFileType = (file, cb) => {
  if ((file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')) cb(null, true)
  else cb(null, false)
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images')
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname)
  },
})
const upload = multer({
  storage,
  onError: function (err, next) {
    console.log('error');

  },

  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});

/* POST REGISTER*/
app.post('/register', upload.single('files'), async (req, res) => {


  /*check of the image */

  file = req.file;
  try {
    if (tools.isEmpty(file)) {
      console.log('No file uploaded')
      return res.send('No file uploaded');
    }

    if (file.size === 0) {
      return res.send('is not a file');
    }
  }
  catch{
    console.log('Invalid input')
  }

  /* check of th rest of the body*/
  const { firstname, lastname, username, email, password, confirmPassword } = req.body;

  let GetUserByUsername = await user.select('GetUserByUsername', username);
  let GetUserByEmail = await user.select('GetUserByEmail', email);
  let data = {
    isValid: true,
    errUsername: null,
    errEmail: null,
    errPicture: null
  };
  if (!tools.isEmpty(GetUserByEmail)) {
    data.errEmail = 'Email already exists';
  }
  if (!tools.isEmpty(GetUserByUsername)) {
    data.errUsername = 'Username already exists';
  }
  if (!tools.isLastname(lastname) || !tools.isFirstname(firstname) || !tools.isUsername(username) || !tools.isEmail(email) || !tools.isEmpty(GetUserByEmail) || !tools.isEmpty(GetUserByUsername) || !tools.isPassword(password, confirmPassword)) {
    data.isValid = false;
  }
  else {
    try {
      const isImage = await Jimp.read('./public/images/' + file.filename);
      let hashPassword = await bcrypt.hash(password, 10);
      const verifToken = crypto.randomBytes(64).toString('hex');
      user.Register(lastname, firstname, username, email, hashPassword, file.filename);
      user.UpdateVerifToken(email, verifToken);
      EM.sendEmail(email, verifToken);
    }
    catch (e) {
      data.errPicture = 'picture is not valid'
      data.isValid = false;
    }



  }
  res.send(data);
});
module.exports = app;