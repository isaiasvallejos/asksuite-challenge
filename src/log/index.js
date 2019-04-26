import winston from 'winston'

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
  format: winston.format.json()
})

export const logError = log => logger.error(log)

export const logInfo = log => logger.info(log)

export const logDebug = log => logger.debug(log)

export const logWarn = log => logger.warn(log)

export default logger
