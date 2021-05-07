import {user} from '../models/user.js';
import mongoose from 'mongoose';

/**
 * RETURN STANDARIZED RESPONSE
 * @param {boolean} error - ERROR STATUS
 * @param {string} message - ADDITIONAL MESSAGE
 * @param {Object} data - RETURNED DATA IF EXIST
 * @returns
 */
const respObj = (error, message, data) => ({ 
  error, 
  message,
  data,
})

export const fetchAll = async(req, res) => {
  try{
    const data = await user.find();
    res.status(200).json({
      error: false,
      message: 'data fetched successfully',
      data
    })
  }catch(err){
    res.status(404).json({
      error: true,
      message: 'data not found or not fetched successfully',
      data
    })
  }
} 


export const save = async(req, res) => {
  try{
    const data = req.body;
    const newUser = new user(data);
    await newUser.save();
    res.status(201).json(respObj(false, 'data saved succesfully', newUser));
  }catch(err){
    res.status(403).json(respObj(true, 'data saved failed', err));
  }
}

export const findById = async(req, res) => {
  const _id = req.params.id;
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status()
  const found = user.findById()
}