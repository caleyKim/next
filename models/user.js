module.exports = (sequelize, DataTypes) => {

  return sequelize.define('user', {
    user_id : {
      type : DataTypes.STRING(40),
      allowNull : false,
      unique : true
    },
    password : {
      type : DataTypes.STRING(255),
      allowNull : false,
    },
    permission : {
      type : DataTypes.INTEGER.UNSIGNED,
      allowNull : false,
    },
    parent_id : {
      type : DataTypes.INTEGER.UNSIGNED,
      allowNull : true,
    },
    email : {
      type : DataTypes.STRING(255),
      allowNull : true,
    },
    address : {
      type : DataTypes.STRING(255),
      allowNull : true,
    },
    name : {
      type : DataTypes.STRING(20),
      allowNull : false,//널 허용하냐
    },
    age : {
      type : DataTypes.INTEGER.UNSIGNED, // 0이상 정수만
      allowNull : false,
    },
    phone_number : {
      type : DataTypes.STRING(20),
      unique : true,
      allowNull : false,
    },
    created_at : {
      type : DataTypes.DATE,
      allowNull : false,
      defaultValue : sequelize.literal('now()'),
    },
  },{
    timestamps : false,
    paranoid : true,
    underscored : true,
  });
}

