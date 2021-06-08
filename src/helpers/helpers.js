/* ----------------------------------------------------------------------------- */

export function omitTypename(key, value) {
  return key === '__typename' ? undefined : value
};

/* ----------------------------------------------------------------------------- */

export function clearDataFromTypename (data) {
  return JSON.parse(JSON.stringify(data), omitTypename)
};