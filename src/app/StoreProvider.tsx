"use client";
import { useEffect, useRef, useState } from "react";
import { IAppState, appActions } from "@/store/app/slice";
import { store } from "@/store/root/config.store";
import { ShowAlertType } from "@/types/ShowAlertType";
import { Store } from "@reduxjs/toolkit";
import { Alert } from "flowbite-react";
import { Provider } from "react-redux";

let prevAlertMessage: ShowAlertType | null = null;

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [alert, setAlert] = useState<ShowAlertType | null>(null);

  const storeRef = useRef<Store>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = store;
    // storeRef.current.dispatch(initializeCount(count))
  }
  useEffect(() => {
    storeRef.current?.subscribe(() => {
      if (storeRef.current) {
        const { alertMessage } = storeRef.current.getState().app as IAppState;
        if (prevAlertMessage !== alertMessage) {
          prevAlertMessage = alertMessage;
          setAlert(alertMessage);
        }
      }
    });
  }, [storeRef]);

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        storeRef.current?.dispatch(appActions.alertFailureState());
      }, 3000);
    }
  }, [alert]);

  return (
    <Provider store={storeRef.current}>
      {children}
      {alert && (
        <div className="absolute m-auto max-w-80 right-16 bottom-16">
          <Alert
            color={alert.type}
            onClick={() =>
              storeRef.current?.dispatch(appActions.alertFailureState())
            }
          >
            <span className="font-medium">{alert.title}</span>
            {` ${alert.message}`}
          </Alert>
        </div>
      )}
    </Provider>
  );
}
