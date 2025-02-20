import { defineAction } from "redux-define";

const appNamespace = defineAction("TANYO_MEETING");

export const STORAGE = defineAction(
  "STORAGE",
  ["TOKEN", "REFRESH_TOKEN", "LANGUAGE"],
  appNamespace
);
