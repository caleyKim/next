const express = require('express');
const router = express.Router();

//GET users/
router.get('/',(req,res,next)=>{
  console.log('유저');
  
})

//DELETE users/
router.delete('/',(req,res)=>{

})
module.exports = router;