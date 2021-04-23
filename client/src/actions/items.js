import {fetchAllItems, postItem, updateItemById, deleteItemById} from '../Api';

export const fetchAll = () => async (dispatch) =>  {
	try{
		const {data} = await fetchAllItems();
		dispatch({type: 'FETCH_ITEMS', payload: data})
	}catch(err){
		console.log('Error Fetching All Items', err);
	}
}


export const post = (newItem, progress) => async (dispatch) => {
	try{
		const {data} = await postItem(newItem, (loaded, total) => progress(loaded, total));
		dispatch({type: 'POST_ITEM', payload: data})
	}catch(err){
		console.log('Error Saving Data', err);
	}
}

export const updateById = (id, newItem, cb) => async (dispatch) => {
	try{
		const {data} = await updateItemById(id, newItem);
		dispatch({type: 'UPDATE_ITEM', payload: data });
		cb();
	}catch(err){
		console.log('error when update data', err);
	}
}

export const deleteById = (id, cb) => async (dispatch) => {
	try{
		const {data} = await deleteItemById(id);
		dispatch({type: 'DELETE_ITEM', payload: data});
		cb();
	}catch(err){
		console.log('error delete data bro : ', err);
	}
}




