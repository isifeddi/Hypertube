const multer = require('multer')
const express = require('express');
const tools = require('../../tools/index')
const user = require('../../models/user')
var Jimp = require('jimp');
const app = express()
 const checkFileType = (file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') cb(null, true)
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
    
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
  });

app.post('/upload',upload.single('files'),async (req,res) => {
    user_id = req.body.user_id;
    file = req.file;
    // console.log(user_id)
    // console.log(file)

  if(tools.isEmpty(file)){
    console.log('No file uploaded')
    return res.send({isValid : false ,error : 'No file uploaded'});
  }
  if(file.size === 0){
    return res.send({isValid : false ,error : 'is not file'});
  }
   
   
  try {
     await Jimp.read('./public/images/'+file.filename);
     try {
        await user.update("UpdateImage",[file.filename,user_id])
        res.send({isValid : true,data : file.filename})
     } catch (error) {
         console.log('error')
     }
     
  } catch (error) {
    res.send({isValid : false ,error : 'Invalid images'})
  }

  
//       Jimp.read('./public/images/'+file.filename)
//   .then(img => {
//       console.log('dasdasdasdasdas')
//     user.update("UpdateImage",{user_id : user_id, path : file.filename})
//       .then((resp) => {
//         if(resp)
//           res.send(resp);
//       }).catch((err)=>{
//         res.send(err);
//       })
//   })
//   .catch(err => {
//     console.log('this is not image')
//     res.send('this is not image');
//   });   

});
module.exports = app;
