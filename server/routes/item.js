import express from 'express';
import { fetchAll, fetchById, create, update, deleteById } from '../controllers/item.js';
const router = express.Router();

//localhost:5000/item/
router.get("/", fetchAll);
router.get("/:id", fetchById);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deleteById);

export default router;