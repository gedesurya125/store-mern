import express from 'express';
import {fetchAll, save} from '../controllers/userController.js'; 

const router = express.Router();

router.get('/',fetchAll);
router.post('/', save);

export default router;