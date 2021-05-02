const initialState = {
  isEditModalOpen: false,
  editModalContent: {},
  isLoading: false
}
const globalReducer = (state = initialState, action) => {
  switch(action.type){
    case 'toggleEditModal': return {...state, isEditModalOpen: ! state.isEditModalOpen };
    case 'setEditModalContent': return { ...state, editModalContent: action.payload };
    case 'toggleLoading': return {...state, isLoading: !state.isLoading };
    default: return state;
  }
}

export default globalReducer;