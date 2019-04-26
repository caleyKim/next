const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn,verifyToken } = require('./middlewares');
// SuperAdmin,Admin,Manager,Staff,
const { User } = require('../models');
const jwt = require('jsonwebtoken');


const router = express.Router();

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', {session : false}, (authError, user, info) => {
    if (authError || !user) {
      return res.status(400).json({
        message: info ? info.message : 'Login failed',
        user
      });
    }
    req.login(user, {session: false}, (err) => {
      if (err) {
        res.send(err);
      }
      const token = jwt.sign(
        user.toJSON(), 
        process.env.JWT_SECRET,
        {
          expiresIn : '24h',
        }
      );
      return res.json({
        user : {
          address: user.address,
          age: user.age,
          created_at: user.created_at,
          email : user.email,
          id : user.id,
          name : user.name,
          parent_id : user.parent_id,
          permission : user.permission,
          phone_number : user.phone_number,
          user_id : user.user_id,
        },
        token
      });
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

router.get('/users', verifyToken, async (req,res,next) => {
  try{
    const user = await User.findAll()
    res.json(user)
  }catch(error){
    console.error(error);
    next(error);
  }
})
router.post('/register', async (req,res,next) => {
  const {user_id, password, permission, parent_id, email, address, name, age, phone_number } = req.body;
  try{
    const exUser = await User.find({where : {user_id}})
    if(exUser){
      return res.json({
        code: 401,
        message: '이미 가입된 아이디입니다.',
      })
    }
    const hash = await bcrypt.hash(password, 10);
    await User.create({
      user_id,
      password : hash,
      permission,
      parent_id,
      email,
      address,
      name,
      age,
      phone_number,
    })
    return res.json({
      code : 200,
      message : '회원가입을 완료했습니다. 로그인 해주세요.'
    })
  } catch(error){
    console.error(error);
    next(error);
  }
})

router.post('/super_register', verifyToken, async (req,res,next) => {
  const {user_id, password, permission, parent_id, email, address, name, age, phone_number } = req.body;
  try{
    const user = await User.find({where : { user_id }})
    if(!user){
      const hash = await bcrypt.hash(password, 10);
      await User.create({
        user_id,
        password : hash,
        permission,
        parent_id,
        email,
        address,
        name, 
        age,
        phone_number,
      })
      return res.json({
        code : 200,
        message : '성공적으로 생성하였습니다.'
      })
    }
    res.json({
      code : 401,
      message : '해당 아이디가 존재합니다. 다른아이디를 사용하세요.',
    })
    next(error);
  } catch(err){
    res.json({
      code : 401,
      message : '핸드폰번호가 겹칩니다.',
    })
    next(error);
  }
})

router.get('/super_admins',(req,res,next) => {
  SuperAdmin.findAll()
    .then( (SuperAdmins) => {
      res.json(SuperAdmins)
    })
    .catch( (err) => {
      console.error(err);
      next(err);
    })
})

router.get('/admins/:id',(req, res, next)=>{
  Admin.findAll({
    include : {
      model : SuperAdmin,
      where : { id : req.params.id }
    }
  })
    .then((admins) => {
      res.json(admins)
    })
    .catch((err) => {
      console.error(err);
      next(err)
    })
})

router.get('/managers/:id', (req,res,next)=>{
  Manager.findAll({
    include : {
      model : Admin,
      where : { id : req.params.id }
    }
  })
    .then((managers) => {
      res.json(managers)
    })
    .catch((err)=>{
      console.error(err)
      next(err)
    })
})

router.get('/staffs/:id', (req,res,next)=>{
  Staff.findAll({
    include : {
      model : Manager,
      where : { id : req.params.id }
    }
  })
    .then((staffs) => {
      res.json(staffs)
    })
    .catch((err)=>{
      console.error(err)
      next(err)
    })
})

router.post('/super_login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', {session : false}, (authError, user, info) => {
    if (authError || !user) {
      return res.status(400).json({
        message: info ? info.message : 'Login failed',
        user
      });
    }
    req.login(user, {session: false}, (err) => {
      if (err) {
        res.send(err);
      }
      const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
      return res.json({user, token});
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

// router.post('/super_register',async (req,res,next) => {
//   const { name, age, permission, phone_number, super_id, password} = req.body;
//   try{
//     const exUser = await SuperAdmin.find({where : {super_id}})
//     if(exUser){
//       return res.json({
//         code: 401,
//         message: '이미 가입된 아이디입니다.',
//       })
//     }
//     const hash = await bcrypt.hash(password, 10);
//     await SuperAdmin.create({
//       name,
//       age,
//       permission,
//       phone_number,
//       super_id,
//       password : hash
//     })
//     return res.json({
//       code : 200,
//       message : '회원가입을 완료했습니다. 로그인 해주세요.'
//     })
//   } catch(error){
//     console.error(error);
//     next(error);
//   }
// })



router.post('/manager_register',async (req,res,next) => {
  const { admin_id,name, age, permission, phone_number, manager_id, password} = req.body;
  try{
    const exUser = await Manager.find({where : {manager_id}})
    if(exUser){
      return res.json({
        code: 401,
        message: '이미 가입된 아이디입니다.',
      })
    }
    const hash = await bcrypt.hash(password, 10);
    await Manager.create({
      admin_manager : admin_id,
      name,
      age,
      permission,
      phone_number,
      manager_id,
      password : hash
    })
    return res.json({
      code : 200,
      message : '회원가입을 완료했습니다. 로그인 해주세요.'
    })
  } catch(error){
    console.error(error);
    next(error);
  }
})

router.post('/staff_register',async (req,res,next) => {
  const { manager_id,name, age, permission, phone_number, staff_id, password} = req.body;
  try{
    const exUser = await Staff.find({where : {staff_id}})
    if(exUser){
      return res.json({
        code: 401,
        message: '이미 가입된 아이디입니다.',
      })
    }
    const hash = await bcrypt.hash(password, 10);
    await Staff.create({
      manager_staff : manager_id,
      name,
      age,
      permission,
      phone_number,
      staff_id,
      password : hash
    })
    return res.json({
      code : 200,
      message : '회원가입을 완료했습니다. 로그인 해주세요.'
    })
  } catch(error){
    console.error(error);
    next(error);
  }
})
//DELETE users/
router.post('/user',(req,res,next)=>{
  User.create({
    name : req.body.name,
    age : req.body.age,
    married : req.body.married,
    permission : req.body.permission,
    phone_number : req.body.phone_number
  })
    .then((result) => {
      console.log(result);
      res.status(201).json(result);
    })
    .catch((err) => {
      console.error(err)
      next(err)
    })
})



router.delete('/',(req,res,next)=>{

})
module.exports = router;