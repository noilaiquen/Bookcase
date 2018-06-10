export const CONNECTION_CHANGE = 'CONNECTION_CHANGE';

export const watchConnection = isConnected => ({
   type: CONNECTION_CHANGE,
   isConnected
});
