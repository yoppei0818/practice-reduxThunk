import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export const fetchPhotos = createAsyncThunk("/photos/fetchPhotos", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/photos");
  return response.json();
});

export type PhotoData = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

type Photos = {
  data: PhotoData[];
  status: "idle" | "pending" | "succeeded" | "failed";
  error: undefined | string;
};

const initialState: Photos = {
  data: [],
  status: "idle",
  error: undefined,
};

export const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPhotos.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchPhotos.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(fetchPhotos.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const selectPhotos = (state: RootState) => state.photos;
export default photoSlice.reducer;
