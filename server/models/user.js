
var Sequelize = require('sequelize'),
	_ = require('lodash')
	u = require('../lib/util');


var tableName = 'User',
	tableAttributes = {
		id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true },
		name: { type: Sequelize.STRING, allowNull: false },
		email: { type: Sequelize.STRING, allowNull: false },
		avatar: Sequelize.STRING
	};

var databaseRef;

module.exports = {
	defineTable: function(sequelize) {
		databaseRef = sequelize;
		return databaseRef.define(tableName, tableAttributes);
	},

	/**
	 * 
	 */
	add = function(userData) {
		if (! u.validateKeys(userData, tableAttributes)) {
			throw new Exception("invalid keyname defined");
		}
		return new UserClass(userData);
	},

	update = function() {

	},

	remove = function() { 

	},

	getById = function(id) {

	},

	getByEmail = function(email) {

	}

};