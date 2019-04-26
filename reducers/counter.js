import * as types from '../actions/ActionTypes';

const initialState = {
  number : 0,
  dummy : 'dumbdumb',
  dumbObject : {
    a:1,
    b:2,
    c:3
  }
};

export default function counter(state = initialState, action) {
  switch (action.type){
    case types.INCREMENT : 
      return {
        ...state,
        number : state.number + 1,
        dumbObject : {
          ...state.dumbObject,
          c : '변경이닷!'
        },

      }
    case types.DECREMENT : 
      return {
        state,
        number : state.number - 1
      }
    default :
      return state;
  }
}