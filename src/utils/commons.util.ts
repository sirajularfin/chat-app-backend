import logger from './logger.util.js';

export const formatJson = (args: undefined): string => {
	try {
		const jsonString = typeof args === 'string' ? args : JSON.stringify(args);
		const parsed = JSON.parse(jsonString);
		return JSON.stringify(parsed, null, 2);
	} catch (e) {
		logger(`[JSON Formatting] Invalid JSON: ${e}`, 'error');
		return String(args);
	}
};
