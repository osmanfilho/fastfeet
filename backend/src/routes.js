import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import FileController from './app/controllers/FileController';
import RecipientController from './app/controllers/RecipientController';
import DeliveryController from './app/controllers/DeliverymanController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients', RecipientController.update);

routes.get('/deliverymans', DeliveryController.index);
routes.post('/deliverymans', DeliveryController.store);
routes.put('/deliverymans', DeliveryController.update);
routes.delete('/deliverymans/:id', DeliveryController.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
