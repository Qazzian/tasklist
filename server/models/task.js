
var Sequelize = require('sequelize');



var tableName = 'User',
	tableAttributes = {
		id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true },
		name: { type: Sequelize.STRING, allowNull: false },
		email: { type: Sequelize.STRING, allowNull: false },
		avatar: Sequelize.STRING
	};

module.exports = {
	defineTable: function(sequelize) {
		return sequelize.define(tableName, tableAttributes);
	},

	/**
	 * 
	 */
	add = function(userData) {

	},

	getById = function(id) {

	},

};