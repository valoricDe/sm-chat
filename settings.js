const path = require('path');

const project = {
	title: 'sm', // your awesome app title
	root: 'root', // root where your react app will be rendered
};

const paths = {
	misc: __dirname,
	node_modules: {
		path: path.join(__dirname, 'node_modules'),
	},
	src: {
		path: path.join(__dirname, 'src'),
	},
};

const server = {
	protocol: 'http',
	host: 'localhost',
	port: 7070,
};

const graphqlServer = {
	host: 'localhost',
	port: 5000,
	schemaLocation: {json: path.join(paths.src.path, 'schema.json'), graphql: path.join(paths.src.path, 'schema.graphql')},
};

const postgresServer = {
	host: 'localhost',
	port: '5432',
	user: 'admin',
	password: 'test1234',
	db: 'admin',
};

const html = {
	title: project.title,
	favicon: path.join(paths.misc, 'favicon.ico'),
	template: path.join(paths.misc, 'template.ejs'),
	inject: 'body',
	root: project.root,
};

module.exports.project = project;
module.exports.paths = paths;
module.exports.server = server;
module.exports.graphql = graphqlServer;
module.exports.postgres = postgresServer;
module.exports.html = html;