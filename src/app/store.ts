import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import photoReducer from "../features/photos/photoSlice";

export const store = configureStore({
  reducer: {
    photos: photoReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
