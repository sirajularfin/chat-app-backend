import express from 'express';
import establishDbConnection from './integrations/database.js';
import httpHeadersMiddleware from './middlewares/httpHeaders.middleware.js';
import { loadConfig } from './utils/config.util.js';
import logger from './utils/logger.util.js';
import userRoutes from './routes/user.routes.js';
import { ROUTE_USER } from './constants/routes.js';

const app = express();
const { port } = await loadConfig();

app.use(express.json()); // Parses JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parses form data (x-www-form-urlencoded)
app.use(httpHeadersMiddleware);

await establishDbConnection(() => {
  app.listen(port, () => {
    logger(`[Server] Started at port: ${port}`, 'info');
  });
});

app.use(ROUTE_USER, userRoutes);