import API_RESOURCES       from './resources';
import createCommonReducer from './commonReducer';
import isEmpty             from 'lodash/isEmpty';

function graphQLReduxAPI () {
	const result = {
		reducers: {},
		queries: {},
		mutations: {}
	}

	Object.keys(API_RESOURCES).forEach((name) => {
		const temp = createCommonReducer({
			name,
			resource: API_RESOURCES[name].resource,
			...API_RESOURCES[name]
		});

		result.reducers[name] = temp.reducer;
		result.queries[name] = temp.query;

		if (!isEmpty(temp.mutations)) {
			Object.keys(temp.mutations).forEach((mutationName) => {
				result.mutations[mutationName] = temp.mutations[mutationName]
			});
		}
	});

	return result;
}

export default graphQLReduxAPI();