import pino from 'pino';
import dayjs from 'dayjs';

const LOGGER = pino({
  prettyPrint: true,
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default LOGGER;
