
import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  roomNum: null,
  bookingNumber: null,
  guestName: null,
  guestMobile: null,
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
     setGuestName: (state, action) => {
      state.guestName = action.payload;
    },
    setGuestMobile: (state, action) => {
      state.guestMobile = action.payload;
    },
  },
});

export const { setRoomNumber, setBookingNumber, setGuestName, setGuestMobile  } = roomSlice.actions;
export default roomSlice.reducer;


