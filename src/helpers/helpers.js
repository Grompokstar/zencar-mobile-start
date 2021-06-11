import pickBy           from 'lodash/pickBy';
import omitBy           from 'lodash/omitBy';

/* ----------------------------------------------------------------------------- */

export function omitTypename(key, value) {
  return key === '__typename' ? undefined : value
};

/* ----------------------------------------------------------------------------- */

export function clearDataFromTypename (data) {
  return JSON.parse(JSON.stringify(data), omitTypename)
};

/* ----------------------------------------------------------------------------- */

export function clearObjectFromEmpties (object) {
  const withNumValues = pickBy(object, isNumber);
  const omitted = omitBy(object, isEmpty);

  return {...omitted, ...withNumValues};
}