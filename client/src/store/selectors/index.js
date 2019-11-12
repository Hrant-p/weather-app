const weatherSelector = state => state.get('weatherReducer');

export const errorSelector = state => weatherSelector(state).get('error');
export const temperatureSelector = state => weatherSelector(state).get('temperature');
export const isLoadingSelector = state => weatherSelector(state).get('isLoading');
export const serverStatusSelector = state => weatherSelector(state).get('serverStatus');
export const channelStatusSelector = state => weatherSelector(state).get('channelStatus');
