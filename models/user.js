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