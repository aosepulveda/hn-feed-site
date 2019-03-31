const { createLogger, format, transports } = require('winston');
const moment = require('moment-timezone');

const env = process.env.NODE_ENV || 'development';

const appendTimestamp = format((info, opts) => {
  if (opts.tz) {
    info.timestamp = moment().tz(opts.tz).format();
  }
  return info;
});

const logger = createLogger({
  // change level if in dev environment versus production
  level: env === 'development' ? 'debug' : 'info',
  transports: [
    new transports.Console({
      format: format.combine(
        appendTimestamp({ tz: 'America/Santiago' }),
        format.json(),
      ),
      stderrLevels: ['error'],
    }),
  ],
});

module.exports = logger;
