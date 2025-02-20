import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../store/root/hooks";
import { ProfileType } from "@/types/ProfileType";
import {
  authActions,
  selectLoadingAuth,
  selectProfile,
  selectRoomId,
  selectTokenAuth,
} from "@/store/auth/slice";
import { LoginBodyType } from "@/types/LoginType";

interface AuthServiceOperators {
  loadingAuth: boolean;
  profile: ProfileType | null;
  tokenAuth: string | null;
  roomId: string | null;
  loginRequest: (args: LoginBodyType) => void;
  profileChange: (args: ProfileType | null) => void;
}

const useAuthService = (): Readonly<AuthServiceOperators> => {
  const dispatch = useAppDispatch();

  return {
    loadingAuth: useAppSelector(selectLoadingAuth),
    profile: useAppSelector(selectProfile),
    tokenAuth: useAppSelector(selectTokenAuth),
    roomId: useAppSelector(selectRoomId),
    loginRequest: useCallback(
      (args: LoginBodyType) => {
        dispatch(authActions.loginRequestState(args));
      },
      [dispatch]
    ),
    profileChange: useCallback(
      (args: ProfileType | null) => {
        dispatch(authActions.profileChangeState(args));
      },
      [dispatch]
    ),
  };
};

export default useAuthService;
