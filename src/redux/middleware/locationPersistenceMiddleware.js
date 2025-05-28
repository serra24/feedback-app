// redux/middleware/locationPersistenceMiddleware.js
export const locationPersistenceMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  if (
    action.type === 'location/setLocationAsked' ||
    action.type === 'location/setLocationStatus'
  ) {
    try {
      const state = store.getState().location;
      sessionStorage.setItem('locationState', JSON.stringify(state));
    } catch (err) {
      console.error("Failed to persist location state:", err);
    }
  }

  return result;
};
