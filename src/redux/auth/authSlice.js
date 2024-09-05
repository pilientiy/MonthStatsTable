import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import {
  deleteUserThunk,
  loginThunk,
  logoutThunk,
  refreshThunk,
  signupThunk,
  updAvatarThunk,
  updUserInfoThunk,
} from './authThunk';

const initialState = {
  token: null,
  user: {
    id: null,
    email: null,
    name: null,
    avatar: null,
  },
  authenticated: false,
  isLoading: false,
  error: null,
};

const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};
const handleFulfilled = (state, { payload }) => {
  state.isLoading = false;
  state.token = payload.token;
  state.authenticated = true;
  state.user = payload.user;
};
const handleError = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};
const handlerefreshFulfilled = (state, { payload }) => {
  state.isLoading = false;
  state.authenticated = true;
  state.user = { ...state.user, ...payload };
};

const handleUpdUserInfoFulfilled = (state, { payload }) => {
  state.isLoading = false;
  state.authenticated = true;
  state.user = { ...state.user, ...payload };
};

const handleUpdAvaFulfilled = (state, { payload }) => {
  state.isLoading = false;
  state.authenticated = true;
  state.user.avatarURL = payload.avatarURL;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  extraReducers: builder =>
    builder
      .addCase(signupThunk.fulfilled, handleFulfilled)

      .addCase(loginThunk.fulfilled, handleFulfilled)

      .addCase(refreshThunk.fulfilled, handlerefreshFulfilled)

      .addCase(updUserInfoThunk.fulfilled, handleUpdUserInfoFulfilled)

      .addCase(updAvatarThunk.fulfilled, handleUpdAvaFulfilled)

      .addCase(logoutThunk.fulfilled, () => initialState)

      .addCase(deleteUserThunk.fulfilled, () => initialState)

      .addMatcher(
        isAnyOf(
          logoutThunk.pending,
          signupThunk.pending,
          loginThunk.pending,
          refreshThunk.pending,
          updUserInfoThunk.pending,
          updAvatarThunk.pending,
          deleteUserThunk.pending
        ),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          logoutThunk.rejected,
          signupThunk.rejected,
          loginThunk.rejected,
          refreshThunk.rejected,
          updUserInfoThunk.rejected,
          updAvatarThunk.rejected,
          deleteUserThunk.rejected
        ),
        handleError
      ),
});

export const authReducer = authSlice.reducer;
