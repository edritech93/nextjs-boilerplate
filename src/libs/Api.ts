import axios, {
  AxiosBasicCredentials,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from "axios";
import { ShowAlertType } from "@/types/ShowAlertType";
import { STORAGE } from "@/constants/define";

type ApiRequest = {
  baseUrl?: string;
  url: string;
  method: Method;
  timeout?: number;
  data?: {};
  params?: {};
  force?: boolean;
  contentType?: "form-data";
  auth?: AxiosBasicCredentials;
  timeUp?: number;
};

export class Api {
  async _request(
    request: ApiRequest,
    isRefresh: boolean = false
  ): Promise<AxiosResponse<any, any>> {
    let options: AxiosRequestConfig = {
      url: request.url,
      method: request?.method ?? "GET",
      baseURL: process.env.NEXT_PUBLIC_BASE_URL,
      timeout: request.timeout === 0 ? request.timeout : 1000 * 90, // default is `0` (no timeout)
    };
    let optHeader = {};
    const token = localStorage.getItem(STORAGE.TOKEN);
    if (token) {
      optHeader = { Authorization: `Bearer ${token}` };
    }
    if (request.contentType && request.contentType === "form-data") {
      optHeader = {
        ...optHeader,
        "Content-Type": "multipart/form-data",
      };
    }
    options.headers = optHeader;
    if (request.auth) {
      options.auth = request.auth;
    }
    if (request.params) {
      options.params = request.params;
    }
    if (request.data) {
      options.data = request.data;
    }
    console.log(
      `${new Date().toTimeString()} REQUEST => `,
      `${options.baseURL}${options.url} | ${JSON.stringify(
        options.data
      )} | ${JSON.stringify(options.params)}`
    );
    return axios.request(options);
  }

  singleRequest(request: Promise<any>): Promise<any> {
    return new Promise(function (resolve, reject) {
      request
        .then((response: AxiosResponse) => {
          console.log(`${new Date().toTimeString()} RESPONSE => `, response);
          resolve(response);
        })
        .catch((error: AxiosError) => reject(getError(error)));
    });
  }

  async webCheckRoom(args: any): Promise<any> {
    return this._request({
      url: "v1/website/calls/check-room",
      method: "POST",
      data: args,
    });
  }

  async refreshToken(): Promise<any> {
    return this._request(
      {
        url: "v2/auths/refresh-token",
        method: "GET",
      },
      true
    );
  }

  async getProfile(): Promise<any> {
    return this._request({
      url: "v2/profiles/me",
      method: "GET",
    });
  }
}

function getError(error: any): ShowAlertType {
  console.log(
    `${new Date().toTimeString()} ERROR => `,
    JSON.stringify(error?.response) ?? error
  );
  const code = error?.response?.status ?? null;
  let message = error?.response?.data?.message ?? null;
  if (code === 401) {
    message = "401";
  } else if (code === 404) {
    message = message ?? "Server Not Found !";
  } else if (code >= 500 || !message) {
    message = "Something went wrong !";
  }
  const validationMap = error?.response?.data?.errors || [];
  if (validationMap.length > 0) {
    let arrayMsg = "";
    validationMap.map((e: any) => {
      arrayMsg = `${e.msg}\n`;
    });
    message = arrayMsg;
  }
  return {
    title: "Error !",
    message: message,
    type: "failure",
    status: code,
    data: error?.response?.data ?? null,
  };
}

const API = new Api();

export { API };
