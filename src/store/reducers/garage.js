const ADD_VEHICLE               = 'ADD_VEHICLE';

const defaultHandler = (state, action) => {
  return {...state, ...action.payload}
}

export function addVehicle (vehicle) {
  return {
    type: ADD_VEHICLE,
    payload: vehicle
  }
}

export const ACTION_HANDLERS = {
  [ADD_VEHICLE]: (state, action) => {

    return {
      items: [...state.items, action.payload]
    }
  },
};

const initialState = {
  items: []
};

const MyGarageReducer = (state = initialState, action) => {
  let handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export default MyGarageReducer;