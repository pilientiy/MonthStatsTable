import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchMonthWater } from "../../services/api";


export const getMonthWater = createAsyncThunk(
  'monthWater/getMonthWater',
  async (selectDate, thunkAPI) => {
    try {
      const monthWater = await fetchMonthWater(selectDate);
      return monthWater;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
