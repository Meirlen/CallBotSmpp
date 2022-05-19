import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

export const logger = new winston.createLogger({
  transports: [
    new (DailyRotateFile)({
      name: 'access-file',
      level: 'info',
      filename: './logs/access.log',
      json: false,
      datePattern: 'yyyy-MM-DD',
      prepend: true,
      maxFiles: 10
    }),
    new (DailyRotateFile)({
      name: 'error-file',
      level: 'error',
      filename: './logs/error.log',
      json: false,
      datePattern: 'yyyy-MM-DD',
      prepend: true,
      maxFiles: 10
    })
  ]
});
