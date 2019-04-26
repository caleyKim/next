function members(state = { id: '' }, action) {
  switch (action.type) {
    case 'checkSignInStatus': {
      return {
        ...state,
        id: action.id,
      };
    }
    default:
      return state;
  }
}
export default members;