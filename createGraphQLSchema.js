const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');
const { buildClientSchema, introspectionQuery, printSchema } = require('graphql/utilities');
const g = require('./settings').graphql;

var graphqlUrl = 'http://'+g.host+':'+g.port+'/graphql';
console.log("Introspecting: "+graphqlUrl);

// Save JSON of full schema introspection for Babel Relay Plugin to use
var promise = fetch(graphqlUrl, {
	method: 'POST',
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({'query': introspectionQuery}),
}).then(res => res.json()).then(schemaJSON => {
	console.log("Writing schema to file: " + g.schemaLocation.json);

	fs.writeFileSync(
		g.schemaLocation.json,
		JSON.stringify(schemaJSON, null, 2)
	);

	// Save user readable type system shorthand of schema
	const graphQLSchema = buildClientSchema(schemaJSON.data);
	fs.writeFileSync(
		g.schemaLocation.graphql,
		printSchema(graphQLSchema)
	);

	return schemaJSON;
});

module.exports = {schemaPromise: promise};