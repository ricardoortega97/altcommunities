import express from 'express';
import locationsController from '../controllers/locations.js';

const locationsRouter = express.Router();

locationsRouter.get('/', locationsController.getLocations); 
locationsRouter.get('/:location/events', locationsController.getEventsByLocation);

export default locationsRouter;
