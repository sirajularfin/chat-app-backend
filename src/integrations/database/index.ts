import { MongoClient } from 'mongodb';
import { loadConfig } from '../../utils/config.util.js';
import logger from '../../utils/logger.util.js';
import { formatJson } from '../../utils/commons.util.js';

let dbClient: MongoClient | null = null;

const connectDb = async (callback: (result: MongoClient) => void) => {
  if (!dbClient) {
    const { databaseUrl } = await loadConfig();
    try {
      dbClient = new MongoClient(databaseUrl);
      logger(`[Database] Connected!`, 'info');
      callback(dbClient);
    } catch (err: any) {
      logger(`[Database][${databaseUrl}] Connection Error: ${formatJson(err)}`, 'error');
    }
  }
};

export default connectDb;
