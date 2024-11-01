import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize } = format;

// Define your custom log format
const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    colorize(),
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: __dirname + '/error.log', level: 'error' }),
    new transports.File({ filename: __dirname + '/combined.log' }),
  ],
});

export default logger;
