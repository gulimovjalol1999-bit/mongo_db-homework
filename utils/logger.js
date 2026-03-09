const {createLogger, format, transports} = require("winston")
const { combine, timestamp, label, printf, colorize } = format;
require("winston-mongodb")

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  level: "debug",
  format: combine(
    colorize(),
    label({label: "test"}),
    timestamp(),
    myFormat,
  ),
  transports: [
    new transports.Console(),
    new transports.File({filename: "log/all-logs.log"}),
    new transports.MongoDB({db: "mongodb+srv://gulimovjalol1999_db_user:qxTB5c65T6pqcr1f@cluster0.yynjc88.mongodb.net/?appName=Cluster0"})
  ]
})

module.exports = logger