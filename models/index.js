const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config)

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Comment = require('./user')(sequelize, Sequelize);

db.User.hasMany(db.Comment,{ foreignKey : 'commenter', sourceKey : 'id'})
db.Comment.belongsTo(db.User,{ foreignKey : 'commenter', targetKey : 'id'})

module.exports = db;

// db.SuperAdmin = require('./superAdmin')(sequelize,Sequelize);
// db.Comment = require('./comment')(sequelize,Sequelize);
// db.Admin = require('./admin')(sequelize,Sequelize);
// db.Manager = require('./manager')(sequelize,Sequelize);
// db.Staff = require('./staff')(sequelize,Sequelize);

db.User = require('./user')(sequelize,Sequelize);

// db.User.hasMany(db.Comment, {foreignKey : 'commenter', sourceKey : 'id'});
// db.Comment.belongsTo(db.User, {foreignKey : 'commenter', targetKey : 'id'});

// db.SuperAdmin.hasMany(db.Admin, {foreignKey : 'superadmin_admin', sourceKey : 'id'});
// db.Admin.belongsTo(db.SuperAdmin, {foreignKey : 'superadmin_admin', targetKey : 'id'});

// db.Admin.hasMany(db.Manager, {foreignKey : 'admin_manager', sourceKey : 'id'});
// db.Manager.belongsTo(db.Admin, {foreignKey : 'admin_manager', targetKey : 'id'});

// db.Manager.hasMany(db.Staff, {foreignKey : 'manager_staff', sourceKey : 'id'});
// db.Staff.belongsTo(db.Manager, {foreignKey : 'manager_staff', targetKey : 'id'});

module.exports = db;
