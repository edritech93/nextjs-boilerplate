import type { PayloadAction } from "@reduxjs/toolkit";
import { ShowAlertType } from "@/types/ShowAlertType";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../root/config.store";

export interface IAppState {
  isConnected: boolean;
  alertMessage: ShowAlertType | null;
}

const initialState: IAppState = {
  isConnected: true,
  alertMessage: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    connectionStatusState: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    alertRequestState: (state, _: PayloadAction<ShowAlertType>) => {
      state.alertMessage = null;
    },
    alertSuccessState: (state, action: PayloadAction<ShowAlertType>) => {
      state.alertMessage = action.payload;
    },
    alertFailureState: (state) => {
      state.alertMessage = null;
    },
  },
});

// Actions
export const appActions = {
  connectionStatusState: appSlice.actions.connectionStatusState,
  alertRequestState: appSlice.actions.alertRequestState,
  alertSuccessState: appSlice.actions.alertSuccessState,
  alertFailureState: appSlice.actions.alertFailureState,
};

// Selectors
export const selectIsConnected = (state: RootState): boolean =>
  state.auth.isConnected;
export const selectAlertMessage = (state: RootState): ShowAlertType | null =>
  state.auth.alertMessage;
