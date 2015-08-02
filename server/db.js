/**
 * Created by Ian on 15/04/2014.
 */

"use strict";

var Sequelize = require('sequelize'),
		Q = require('q'),
		_ = require('lodash');

var User = require('./models/user');

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

	try {
		db.sync();
	}
	catch (syncException) {
		console.error('Database Sync Error: ', syncException);
	}

	return deferred;
};

function loadObjects(sequelize){

	var tables = {};

	// TODO move these definitions into separate modules

	// Task - the core object of a todo list application
	tables.Task = sequelize.define('Task', {
		id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true },
		name: { type: Sequelize.STRING, allowNull: false },
		description: Sequelize.TEXT,
		isComplete: Sequelize.BOOLEAN,
		priority: Sequelize.BIGINT,
		timeEstimate: Sequelize.DATE
	});

	// Tasks can be tagged 
	tables.Tag = sequelize.define('Tag', {
		id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true },
		name: {type: Sequelize.STRING, allowNull: false, primaryKey: true }
	});

	// TagCloud defined the relationship between Tasks and their tags
	tables.TagCloud = sequelize.define('TagCloud', {
		tagId: {
			type: Sequelize.INTEGER,
			references: {
				model: tables.Tag,
				key: 'id'
			}
		},
		taskId: {
			type: Sequelize.INTEGER,
			references: {
				model: tables.Task,
				id: 'id'
			}
		}
	});

	// User - people
	tables.User = User.defineTable(sequelize);

	// Assignments - Tasks can be assigned to a single User. Users can have multiple Tasks assigned to them
	tables.Assignments = sequelize.define('Assignments', {
		taskId: {
			type: Sequelize.INTEGER,
			references: {
				model: tables.Task,
				id: 'id'
			}
		},
		userId: {
			type: Sequelize.INTEGER,
			references: {
				model: tables.User,
				id: 'id'
			}
		}
	})

	// tables.Tag.hasMany(tables.Task);
	// tables.Task.hasMany(tables.Tag);

	return tables;
}

module.exports.testConnection = function(){
	var promise = module.exports.setup({name: 'test.db'});

};

module.exports.testConnection();

