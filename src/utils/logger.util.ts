import moment from 'moment';

const logger = (error: string, level: 'info' | 'log' | 'warn' | 'error' = 'log'): void => {
	switch (level) {
    case 'info':
      console[level](`ℹ️  [INFO][${moment().format('HH:mm:ss')}] ${error}`);
      break;

    case 'log':
      console[level](`🪵  [LOG][${moment().format('HH:mm:ss')}] ${error}`);
      break;

    case 'warn':
      console[level](`⚠️  [WARN][${moment().format('HH:mm:ss')}] ${error}`);
      break;

    case 'error':
      console[level](`🚨 [ERROR][${moment().format('HH:mm:ss')}] ${error}`);
  }
};

export default logger;
