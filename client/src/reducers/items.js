const itemReducer = (items = [], action) => {
	switch(action.type){
		case 'FETCH_ITEMS' : return action.payload;

		case 'POST_ITEM' : return  [...items, action.payload];

		case 'UPDATE_ITEM' : return items.map(item => item._id === action.payload._id ? action.payload : item );

		case 'DELETE_ITEM' : return [...items.filter(item => item._id !== action.payload._id)];
		
		case 'FIND_ITEM_BY_ID' : return items;

		default:  return items;
			
	}
};

export default itemReducer;