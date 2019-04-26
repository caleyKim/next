module.exports = (sequelize, DataTypes) => {
	return sequelize.define('user',{
		name : {
			type : DataTypes.STRING(20),
			allowNull : false,
			unique : true,
		},
		age : {
			type : DataTypes.INTEGER.UNSIGNED,
			allowNull : false,
		},
		married : {
			type : DataTypes.BOOLEAN,
			allowNull : false
		},
		comment : {
			type : DataTypes.TEXT,
			allowNull : true,
		},
		created_at : {
			type : DataTypes.DATE,
			allowNull : false,
			defaultValue : sequelize.literal('now()')
		}
	},{
		timestamps : false,
		underscored : true,
	});
}

//type  : 자료형  (STRING, INTEGER, FLOAT, TEXT, DATE, BOOLEAN)
//		UNSIGNED음수 안됨
//allowNull : null이어도 되냐?
//unique : 고유값 여부
//defaultValue : 기본값
//comment : 컬럼설명
//primaryKey  : 기본키 여부( id 대채)
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

