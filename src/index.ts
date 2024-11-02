import express, { Application } from 'express';
import { responseHandler } from './middlewares/responseHandler';

import logger from './libs/logger/logger';
import bodyParser from 'body-parser';
import cors from 'cors';
import roleRoutes from './modules/role/roleRoutes'
import tenantRoutes from './modules/tenant/tenantRoutes'

const app:Application = express();
const port:number = Number(process.env.PORT) || 3000;

// Use the response handler
app.use(responseHandler);


// Setup bodyparser
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors()); // Enable All CORS Requests

app.use('/roles', roleRoutes);
app.use('/tenants', tenantRoutes);

app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
    