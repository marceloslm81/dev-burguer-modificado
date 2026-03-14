import express from 'express';
import router from './routes.js';
import fileRouteConfig from './config/fileRoutes.cjs';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use('/product-file', fileRouteConfig);

export default app;
