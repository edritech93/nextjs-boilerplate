import type { PayloadAction } from "@reduxjs/toolkit";
import { ProfileType } from "@/types/ProfileType";
import { ResponseLoginType } from "@/types/ScheduleType";
import { RootState } from "../root/config.store";
import { createSlice } from "@reduxjs/toolkit";
import { LoginBodyType } from "@/types/LoginType";

interface IAuthState {
  profile: ProfileType | null;
  loadingAuth: boolean;
  tokenAuth: string | null;
  roomId: string | null;
}

const initialState: IAuthState = {
  profile: null,
  loadingAuth: false,
  tokenAuth: null,
  roomId: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequestState: (state: IAuthState, _: PayloadAction<LoginBodyType>) => {
      state.loadingAuth = true;
      state.profile = null;
      state.tokenAuth = null;
    },
    loginSuccessState: (
      state: IAuthState,
      action: PayloadAction<ResponseLoginType>
    ) => {
      state.loadingAuth = false;
      state.tokenAuth = action.payload.token;
      state.roomId = action.payload.roomId;
    },
    loginFailureState: (state: IAuthState) => {
      state.loadingAuth = false;
      state.profile = null;
    },
    profileChangeState: (state, action: PayloadAction<ProfileType | null>) => {
      state.profile = action.payload;
    },
  },
});

// Actions
export const authActions = authSlice.actions;

// Selectors
export const selectLoadingAuth = (state: RootState): boolean =>
  state.auth.loadingAuth;

export const selectProfile = (state: RootState): ProfileType | null =>
  state.auth.profile;

export const selectTokenAuth = (state: RootState): string | null =>
  state.auth.tokenAuth;

export const selectRoomId = (state: RootState): string | null =>
  state.auth.roomId;
