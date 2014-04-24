/**
 * Created by Ian on 15/04/2014.
 */

"use strict";

var Sequelize = require('sequelize'),
		Q = require('q'),
		_ = require('underscore');

var DEFAULT_OPTIONS = {
	dialect: 'sqlite',
	storage: 'tasks.sqlite'
};

module.exports.setup = function(options){

	var deferred = Q.defer(),
			ops = _.extend({}, DEFAULT_OPTIONS, options),
			db;
	delete ops.name;
	delete ops.username;
	delete ops.password;

	db = new Sequelize(options.name, options.username, options.password, ops);
	loadObjects(db);

	db.sync().success(function(){
		deferred.resolve();
		console.log('it worked');
	}).error(function(error){
		console.log('error: ', error);
		deferred.reject(error);
	});

	return deferred;
};

function loadObjects(sequelize){

	var tables = {};

	tables.Tag = sequelize.define('Tag', {
		name: {type: Sequelize.STRING, allowNull: false, primaryKey: true }
	});

	tables.Task = sequelize.define('Task', {
		name: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
		description: Sequelize.TEXT,
		isComplete: Sequelize.BOOLEAN,
		priority: Sequelize.BIGINT,
		timeEstimate: Sequelize.DATE
	});

	tables.Tag.hasMany(tables.Task);
	tables.Task.hasMany(tables.Tag);

	return tables;
}

module.exports.testConnection = function(){
	var promise = module.exports.setup({name: 'test.db'});

};

module.exports.testConnection();

