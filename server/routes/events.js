import express from 'express';
import eventController from '../controllers/events.js';

const eventsRouter = express.Router();

eventsRouter.get('/', eventController.getEvents);


export default eventsRouter;