import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
	createdAt: { type: Date, default: new Date() },
	brand: {
		type: String,
		default: '',
	},
	name: {
		type: String,
		default: '',
	},
	price: {
		type: Number,
		default: 0,
	},
	expire: {
		type: Date,
		default: new Date(),
	},
	stock: {
		type: Number,
		default: 0,
	},
	image: {
		name: {
			type: String,
			default: '',
		},
		type: {
			type: String,
			default: '',
		},
		size: {
			type: Number,
			default: 0,
		},
		base64: {
			type: String,
			default: '',
		},
	},
});


export const ItemStock = mongoose.model('ItemStock', itemSchema);




