// import { configureStore } from "@reduxjs/toolkit";
// import roomReducer from "./slices/roomSlice";

// const store = configureStore({
//   reducer: {
//     room: roomReducer,
//   },
// });

// export default store;
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // This uses localStorage by default
import roomReducer from "./slices/roomSlice"; // Import your room slice reducer
import sessionStorage from "redux-persist/es/storage/session";
import guestEvaluationReducer from "./slices/guestEvaluationSlice";
import evaluationReducer from "./slices/evaluationSlice";
const persistConfig = {
  key: "root",
  // storage,
  storage: sessionStorage,
};

const persistedRoomReducer = persistReducer(persistConfig, roomReducer);

const store = configureStore({
  reducer: {
    room: persistedRoomReducer,
    guestEvaluation: guestEvaluationReducer,
    evaluation: evaluationReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
