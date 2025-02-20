import { combineReducers } from "@reduxjs/toolkit";
import { appSlice } from "../app/slice";
import { authSlice } from "../auth/slice";

export const rootReducer = combineReducers({
  app: appSlice.reducer,
  auth: authSlice.reducer,
});
