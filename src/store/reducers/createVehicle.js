const SET_MANUFACTURER         = 'SET_MANUFACTURER';
const SET_MODEL                = 'SET_MODEL';
const RESET_VEHICLE            = 'RESET_VEHICLE';

const defaultHandler = (state, action) => {
  return {...state, ...action.payload}
}

export function setManufacturer (manufacturer = {}) {
  return {
    type: SET_MANUFACTURER,
    payload: manufacturer
  }
}

export function setModel (model = {}) {
  return {
    type: SET_MODEL,
    payload: model
  }
}

export function resetVehicle () {
  return {
    type: RESET_VEHICLE,
    payload: {}
  }
}

export const ACTION_HANDLERS = {
  [SET_MANUFACTURER]: defaultHandler,
  [SET_MODEL]: defaultHandler,
  [RESET_VEHICLE]: (state, action) => {
    return {};
  }
};

const initialState = {
  manufacturer: {},
  model: {}
};

const CreateVehicleReducer = (state = initialState, action) => {
  let handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export default CreateVehicleReducer;