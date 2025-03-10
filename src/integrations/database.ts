import mongoose from 'mongoose';
import { loadConfig } from '../utils/config.util.js';
import logger from '../utils/logger.util.js';

/**
 * Establishes a connection to the MongoDB database
 * @param callback - Callback function to be executed after the connection is established
 */
const establishDbConnection = async (callback: () => void) => {
  try {
    // If the connection is already established or is in the process of establishing, return
    if (
      mongoose.connection.readyState === mongoose.STATES.connected ||
      mongoose.connection.readyState === mongoose.STATES.connecting
    ) {
      return;
    }

    // Load the database URL from the configuration file
    const { databaseUrl } = await loadConfig();

    // Connect to the MongoDB database
    await mongoose.connect(databaseUrl);
    logger(`[MongoDB] Connected to database`, 'info');
    callback();
  } catch (err) {
    logger(`[MongoDB] Error connecting to database: ${err}`, 'error');
    process.exit(1);
  }
};

export default establishDbConnection;
