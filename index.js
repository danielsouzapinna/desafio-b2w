const config = require('./config');
const restify = require('restify');
const restifyPlugins = require('restify').plugins;
const mongoose = require('mongoose');
const path = require('path');
const { readdirSync } = require('fs');
const morgan = require('morgan');
const logger = require('./winston-custom-log');
//const restifySwaggerJsdoc = require('restify-swagger-jsdoc');
//const errors = require('restify-errors');

const server = restify.createServer({
    name    : config.name,
	version : config.version
});


server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.fullResponse());

server.use(morgan('{"DATA=>": ":date[clf]", "HTTP METHOD=>": ":method", "STATUS=>": ":status", "URL=>": ":url",  "TEMPO=>": ":response-time", "USER_AGENT=>": ":user-agent"}', {
	stream: {
		write: (message) =>{
			logger.info(message);
		}
	}
}));


server.listen(config.port, function() {
	mongoose.set('useFindAndModify', false);
	mongoose.set('useCreateIndex', true);
    mongoose.connect(config.db.uri, { useNewUrlParser: true });
	const db = mongoose.connection;

	db.on('error', (err) => {
	    console.error(err);
	    process.exit(1);
	});

	db.once('open', () => {
		readdirSync(path.join(__dirname, './routes')).forEach(fileName => {
			const fullPath = path.join(__dirname, './routes', fileName)
			require(fullPath)(server)
		});
		console.log(`Application ${server.name} is listening on port ${config.port}`);
	});
});

module.exports = server;