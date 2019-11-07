const weatherSelector = state => state.get('weatherReducer');

export const errorSelector = state => weatherSelector(state).get('error');
export const temperatureSelector = state => weatherSelector(state).get('temperature');
export const isLoadingSelector = state => weatherSelector(state).get('isLoading');
