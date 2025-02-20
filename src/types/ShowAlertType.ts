export type ShowAlertType = {
  title?: string;
  message: string | object | undefined | null;
  type: "info" | "success" | "failure" | "warning";
  status?: number | undefined | null;
  data?: any;
};
