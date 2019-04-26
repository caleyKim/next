const express = require('express');
const next = require('next');

const logger = require('morgan')
const usersRouter = require('./routes/users')
const commentsRouter = require('./routes/comments')
// const boardRouter = require('./routes/board')

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();
const { sequelize } = require('./models');
const logger = require('morgan');
const passport = require('passport')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const usersRouter = require('./routes/auth');
const commentsRouter = require('./routes/comments');
const { sequelize } = require('./models');
// const passportConfig = require('./passport');
require('./passport');
require('dotenv').config();
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();
const flash = require('connect-flash')

app.prepare()
.then(()=>{
  const server = express();
  sequelize.sync();


  // passportConfig(passport)
  server.use(
    logger('dev'),
    express.json(),
    express.urlencoded({extended : false})
  );

  server.use('/users',usersRouter);
  server.use('/users',commentsRouter)
  // server.use('/board/:title',boardRouter)
  server.use(cookieParser(process.env.COOKIE_SECRET));
  server.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  }));
  server.use(flash());
  // server.use(passport.initialize());
  // server.use(passport.session());
  server.use('/auth',usersRouter);
  server.use('/comments',passport.authenticate('jwt', {session: false}),commentsRouter);
  

  server.get('/board/:title', (req, res) => {
    const page = '/boardView';
    const params = {title: req.params.title}
    app.render(req, res, page, params)
  });
  

  server.get('*', (req, res) => {
    return handle(req, res)
  });
  
  server.listen(9090, (err) => {
    if(err) throw err;
    console.log("> Ready on Server Port: 9090")
  })
})
.catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
})