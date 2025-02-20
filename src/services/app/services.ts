import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../store/root/hooks";
import { appActions, selectAlertMessage } from "@/store/app/slice";
import { ShowAlertType } from "@/types/ShowAlertType";

interface AppServiceOperators {
  alertMessage: ShowAlertType | null;
  alertRequest: (args: ShowAlertType) => void;
}

const useAppService = (): Readonly<AppServiceOperators> => {
  const dispatch = useAppDispatch();

  return {
    alertMessage: useAppSelector(selectAlertMessage),
    alertRequest: useCallback(
      (args: ShowAlertType) => {
        dispatch(appActions.alertRequestState(args));
      },
      [dispatch]
    ),
  };
};

export default useAppService;
