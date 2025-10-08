import express from 'express';
import eventController from '../controllers/eventController.js';

const router = express.Router();

router.get('/', eventController.getEvents); 

export default evensRouter;