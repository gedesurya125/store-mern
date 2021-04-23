const initialState = {
  isEditModalOpen: false,
  editModalContent: {},
}
const globalReducer = (state = initialState, action) => {
  switch(action.type){
    case 'toggleEditModal': return {...state, isEditModalOpen: ! state.isEditModalOpen };
    case 'setEditModalContent': return { ...state, editModalContent: action.payload };
    default: return state;
  }
}

export default globalReducer;