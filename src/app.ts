import express from 'express';
import userRoutes from './routes/userRoutes.js';
import { formatJson } from './utils/commons.util.js';
import logger from './utils/logger.util.js';
import { loadConfig } from './utils/config.util.js';
import connectDb from './integrations/database/index.js';

const app = express();
const { port } = await loadConfig();

app.use(express.json()); // Parses JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parses form data (x-www-form-urlencoded)

app.use((req, res, next) => {
  logger(`[ApiRequest] Body: ${formatJson(req.body)}`);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/ums', userRoutes);

await connectDb(client => {
  app.listen(port, () => {
    logger(`[Server] Started at port: ${port}`, 'info');
  });
});