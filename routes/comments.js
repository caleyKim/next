const express = require('express');
const router = express.Router();

router.get('/',()=>{

})

const { User, Comment } = require('../models');

//GET /comment
//GET /comment/id

router.get('/:id',(req,res,next) => {
  Comment.findAll({
    include : {
      model : User,
      where : { id : req.params.id}
    }
  })
    .then((comments) => {
      console.log(comments);
      res.json(comments);
    })
    .catch((err) => {
      console.log(err);
      next(err)
    })
})

//PATCH /comments/:id
router.patch('/:id',(req,res,next) => {
  Comment.update({
    comment : req.body.comment,
  },{
    where : {
      id : req.params.id
    }
  })
    .then((comments) => {
      console.log(comments);
      res.json(comments);
    })
    .catch((err) => {
      console.log(err);
      next(err)
    })
})

router.delete('/:id',(req,res,next) => {
  Comment.destroy({
    where : {
      id : req.params.id
    }
  })
    .then((comments) => {
      console.log(comments);
      res.json(comments);
    })
    .catch((err) => {
      console.log(err);
      next(err)
    })
})

router.post('/',(req,res,next) => {
  Comment.create({
    commenter : req.body.id,
    comment : req.body.comment
  })
    .then((comments) => {
      console.log(comments);
      res.json(comments);
    })
    .catch((err) => {
      console.log(err);
      next(err)
    })
})
module.exports = router;