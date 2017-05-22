/**
 * For loading the logger and setting it to a global variable.
 *
 * @author Sven Liebig
 */
import env from '../env';

const logger = require('winston');

//logger

logger.add(logger.transports.File, {
	name: 'error-file',
	filename: './logs/logs/error.log',
	level: 'error',
	json: false
});

logger.add(logger.transports.File, {
	name: 'debug-file',
	filename: './logs/debug.log',
	level: 'debug',
	json: false
});

logger.add(logger.transports.File, {
	name: 'info-file',
	filename: './logs/info.log',
	level: 'info',
	json: false
});

logger.addColors({
	debug: "yellow",
	error: "red",
	info: "blue"
});

/*
var logFolder = path.join(app.getPath("userData"), "logs");
var logFile = new Date().toISOString().replace(/:/g, '.') + '.log';
logger.add(logger.transports.File, { filename: path.join(logFolder, logFile) });*/

global.logger = logger;

if (env.name == 'development') {
	logger.level = 'debug';
}
