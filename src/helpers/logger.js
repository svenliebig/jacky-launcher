/**
 * For loading the logger and setting it to a global variable.
 *
 * @author Sven Liebig
 */
import env from '../env';

const logger = require('winston');

function getTimestamp() {
	let now = new Date();
	let day = now.getDate() > 9 ? now.getDate() : "0" + now.getDate();
	let month = (now.getMonth() + 1) > 9 ? (now.getMonth() + 1) : "0" + (now.getMonth() + 1);
	let year = now.getYear();
	let hours = now.getHours() > 9 ? now.getHours() : "0" + now.getHours();
	let minutes = now.getMinutes() > 9 ? now.getMinutes() : "0" + now.getMinutes();
	let seconds = now.getSeconds() > 9 ? now.getSeconds() : "0" + now.getSeconds();
	return `[${day}.${month}.${year}-${hours}:${minutes}:${seconds}] -`;
}

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
	timestamp: () => {
		return getTimestamp();
	},
	formatter: function(options) {
		// Return string will be passed to logger.
		return options.timestamp() +' '+ options.level.toUpperCase() +' '+ (options.message ? options.message : '') +
		(options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
	},
	colorize: true,
});

logger.add(logger.transports.File, {
	timestamp: () => {
		return getTimestamp();
	},
	name: 'error-file',
	filename: './logs/logs/error.log',
	level: 'error',
	json: false
});

logger.add(logger.transports.File, {
	timestamp: () => {
		return getTimestamp();
	},
	name: 'debug-file',
	filename: './logs/debug.log',
	level: 'debug',
	json: false
});

logger.add(logger.transports.File, {
	timestamp: () => {
		return getTimestamp();
	},
	name: 'info-file',
	filename: './logs/info.log',
	level: 'info',
	json: false
});

/*
var logFolder = path.join(app.getPath("userData"), "logs");
var logFile = new Date().toISOString().replace(/:/g, '.') + '.log';
logger.add(logger.transports.File, { filename: path.join(logFolder, logFile) });*/

global.logger = logger;

if (env.name === 'development') {
	logger.level = 'debug';
}
