

// const initialState = {
//   roomNum: null,
// };

// const roomSlice = createSlice({
//   name: "room",
//   initialState,
//   reducers: {
//     setRoomNumber: (state, action) => {
//       state.roomNum = action.payload;
//     },
//   },
// });

// export const { setRoomNumber } = roomSlice.actions;
// export default roomSlice.reducer;
// roomReducer.js
// src/redux/slices/roomSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  roomNum: null,
  bookingNumber: null,
};

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRoomNumber: (state, action) => {
      state.roomNum = action.payload;
    },
    setBookingNumber: (state, action) => {
      state.bookingNumber = action.payload;
    },
  },
});

export const { setRoomNumber, setBookingNumber } = roomSlice.actions;
export default roomSlice.reducer;


