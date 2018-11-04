const {existsSync, mkdirSync } = require('fs');
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const config = require('./config');


if (!existsSync("logs")) {
    mkdirSync("logs");
}

const tsFormat = () => (new Date()).toLocaleTimeString();

const logger = winston.createLogger({
    transports: [
        new winston.transports.DailyRotateFile({
            filename: `logs/${config.name}`,
            datePattern: 'DD_MM_YYYY',
            level: "info",
            prepend: true,
            prettyPrint: true,
            timestamp: tsFormat,
            maxsize: 1048576,
            maxFiles: 10
        }),
        new winston.transports.Console({
          level: "info",
          prettyPrint: true,
          timestamp: tsFormat,
          colorize: true
        })
    ]
});

module.exports = logger;