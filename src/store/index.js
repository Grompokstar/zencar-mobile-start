import { useMemo }             from 'react';
import {
  createStore,
  combineReducers,
  applyMiddleware
}                              from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware         from 'redux-thunk';
import API                     from 'api/api';
import {
  CreateVehicleReducer,
  MyGarageReducer
}                              from './reducers'

let store;

function initStore(initialState) {
  return createStore(
    combineReducers({
      creatingVehicle: CreateVehicleReducer,
      garageVehicles: MyGarageReducer,
      ...API.reducers
    }),
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
};

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}