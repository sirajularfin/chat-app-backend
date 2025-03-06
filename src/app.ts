import express from 'express';
import userRoutes from './routes/userRoutes.js';
import logger from './utils/logger.util.js';
import { formatJson } from './utils/commons.util.js';

const app = express();
// TODO: Fetch PORT from .env files
const port = 3000;

app.use(express.json()); // Parses JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parses form data (x-www-form-urlencoded)

app.use((req, res, next) => {
	logger(`[ClientRequest] Body: ${formatJson(req.body)}`);
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});

app.use('/ums', userRoutes);

app.listen(port, () => {
	logger(`Server is running on port: ${port}`);
});
