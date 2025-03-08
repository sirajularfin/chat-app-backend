import { MongoClient, Db } from 'mongodb';
import { loadConfig } from '../utils/config.util.js';
import logger from '../utils/logger.util.js';
import { formatJson } from '../utils/commons.util.js';

let _dbClient: MongoClient | undefined = undefined;

export const getDatabase = (): Db => {
  if (_dbClient) {
    return _dbClient.db();
  }
  throw new Error(`[Database] No database found!`);
};

const connectDb = async (callback: (result?: MongoClient) => void) => {
  if (!_dbClient) {
    const { databaseUrl } = await loadConfig();
    try {
      _dbClient = new MongoClient(databaseUrl);
      logger(`[Database] Connected!`, 'info');
      callback(_dbClient);
    } catch (err: any) {
      logger(`[Database] Connection Error: ${formatJson(err)}`, 'error');
    }
  }
};

export default connectDb;
