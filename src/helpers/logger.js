/**
 * For loading the logger and setting it to a global variable.
 *
 * @author Sven Liebig
 */
import env from '../env';

const logger = require('winston');

/**
 * formatTimeString - Adds a zero as String to single character numbers (0-9).
 *
 * @param  {int} time Number
 * @return {string} a string of size two.
 */
function formatTimeString(time) {
	return time > 9 ? time : "0" + time;
}

/**
 * getTimestamp - Creates a time string with day, month, year, hour, minute and second.
 *
 * @return {string}  timestamp string
 */
function getTimestamp() {
	let now = new Date();
	let day = formatTimeString(now.getDate());
	let month = formatTimeString(now.getMonth() + 1);
	let year = now.getYear();
	let hours = formatTimeString(now.getHours());
	let minutes = formatTimeString(now.getMinutes());
	let seconds = formatTimeString(now.getSeconds());
	return `[${day}.${month}.${year}-${hours}:${minutes}:${seconds}]`;
}

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
	timestamp: () => {
		return getTimestamp();
	},
	colorize: true
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
