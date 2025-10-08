import express from 'express';
import locationsController from '../controllers/locations.js';

const router = express.Router();

router.get('/', locationsController.getLocations); 
router.get('/:location_id/events', locationsController.getEventsByLocation);

export default router;
