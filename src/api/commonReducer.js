import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import {
  clearDataFromTypename
}                             from 'helpers/helpers';
import isEmpty                from 'lodash/isEmpty';

const PREFIX = "@GRAPHQL_API";

const defaultParams = {
  ssr: false
};

const defaultActionHandler = (state, action) => {
  return {...state, ...action.payload};
}

function throwError(data) {
  const error = new Error("Error");
  error.data = data;
  throw error;
}

function getAPIUrl (ssr) {
  const API_URL = 'https://zencar-backend-dev.dev.zen.car/graphql';

  return API_URL;
}

/* CONFIG */
/*
  resource: string
  fields: string
  mutations: array of strings
*/

export default function createCommonReducer (config) {
  const SET_LOADING = `${PREFIX}_${config.name}_SET_LOADING`;
  const SET_DATA    = `${PREFIX}_${config.name}_SET_DATA`;
  const RESET_DATA  = `${PREFIX}_${config.name}_RESET_DATA`;

  /* ACTIONS */
  /* --------------------------------------------------------------------------------- */
  function setLoading (loading = false) {
    return {
      type: SET_LOADING,
      payload: { loading }
    }
  }

  function setData (data = {}) {
    return {
      type: SET_DATA,
      payload: { loading: false, pristine: false, data }
    }
  }

  function resetData () {
    return {
      type: RESET_DATA,
      payload: { data: {} }
    }
  }

  function _generateQuery (args) {
    const _config = {...config.fields};

    if (args) {
      _config.__args = args
    }

    return jsonToGraphQLQuery({
      query: {[config.resource || config.name]: _config}
    });
  }

  function _generateMutation (name, args) {
    return jsonToGraphQLQuery({
      mutation: {
        [name]: {
          __args: args,
          ...config.fields
        }
      }
    });
  }

  function reset () {
    return dispatch => {
      dispatch(resetData())
    }
  }

  function haveBusinessError (errorTypes) {
    let result = false
    errorTypes.forEach((errorType) => {
      const subType = errorType.slice(-15);
      if (subType === 'BusinessProblem') {
        result = true;
      }
    })
    return result;
  }

  function errorHandler (dispatch, err, ssr) {
    dispatch(setLoading(false));

    const errorTypes = err.data.map((item) => {
      return item.type
    });

    const isBusinessError = haveBusinessError(errorTypes);

    if (isBusinessError) {
      return Promise.reject(err);
    } else {
      console.log(JSON.stringify(err.data));
    }

    return Promise.reject(err);
  }

  function mutation (name, args) {
    return dispatch => {
      dispatch(setLoading(true));

      return fetch(getAPIUrl(), {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({query: _generateMutation(name, args)})
      })
      .then(res => res.json())
      .then((res) => {
        if (!isEmpty(res.errors)) {
          throwError(res.errors);
        }

        const _res = clearDataFromTypename(res);
        const data = _res.data[name];

        dispatch(setData(clearDataFromTypename(data)));

        return Promise.resolve(_res);
      }).catch(errorHandler.bind(this, dispatch));
    }
  }

  function query (args, params = defaultParams) {
    return dispatch => {
      dispatch(setLoading(true));

      return fetch(getAPIUrl(params.ssr), {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          ...params.headers || {}
        },
        body: JSON.stringify({query: _generateQuery(args)})
      })
      .then(res => res.json())
      .then((res) => {
        if (!isEmpty(res.errors)) {
          throwError(res.errors);
        }
        const _res = clearDataFromTypename(res);
        const data = _res.data[config.resource || config.name];

        dispatch(setData(clearDataFromTypename(data)));

        return Promise.resolve(_res);
      })
      .catch((err) => {
        errorHandler(dispatch, err, params.ssr)
      });
    }
  }

  /* ACTION HANDLERS */
  /* --------------------------------------------------------------------------------- */
  const ACTION_HANDLERS = {
    [SET_LOADING]:          defaultActionHandler,
    [SET_DATA]:             defaultActionHandler,
    [RESET_DATA]:           defaultActionHandler,
  };

  query.reset = reset;

  const mutations = {};

  if (!isEmpty(config.mutations)) {
    config.mutations.forEach((mutationName) => {
      mutations[mutationName] = mutation.bind(this, mutationName);
    });
  }

  return {
    reducer: (
      state = {
        loading: false,
        pristine: true,
        data: {}
      },
      action
    ) => {
      let handler = ACTION_HANDLERS[action.type];

      return handler ? handler(state, action) : state;
    },
    query,
    mutations
  };
}
