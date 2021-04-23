import mongoose from 'mongoose';
import {ItemStock} from '../models/item.js';

export const fetchAll = async(req, res) => {
	try{
		const data = await ItemStock.find();
		res.status(200).json(data);
	}catch(err){
		res.status(404).json({error: err});
	}
}

export const fetchById = (req, res) => {
	ItemStock.findById(req.params.id, (err, item) => {
		err ? res.status(404).json({ error: err }) : res.status(200).json(item);
	})
}

export const create = async(req, res) => {

	const newItem = new ItemStock(req.body);
	try{
		await newItem.save();
		res.status(201).json(newItem);
	}catch(err){
		res.status(400).json({error: err});
	}
}

export const update = async(req, res) => {
	const newItem = req.body;

	const {id: _id} = req.params;
	if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('no item with that id');
	const updatedItem = await ItemStock.findByIdAndUpdate(_id, newItem, {new: true});
	res.json(updatedItem);

}

export const deleteById = async(req, res) => {
	const {id: _id} = req.params
	if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('no item with that id');
	const deletedItem = await ItemStock.findByIdAndDelete(_id);
	res.json(deletedItem);
}

