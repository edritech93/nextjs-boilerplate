import axios from 'axios';
import {ALERT_TYPE} from '../constants';
import {Helper} from './Helper';

const {CancelToken} = axios;
let terminateAPI;

const SERVER = {
  API_CLIENT: 0,
  IDENTITY_CLIENT: 1,
  OTHER: 2,
};

export class Api {
  async _request(request, serverId = SERVER.API_CLIENT) {
    let baseUrl = Helper.getBaseUrl();
    switch (serverId) {
      case SERVER.OTHER:
        baseUrl = request.baseUrl;
        break;

      default:
        break;
    }
    const options = {
      url: request.url,
      method: request.method ? request.method : 'get',
      baseURL: baseUrl,
      timeout: request.timeout === 0 ? request.timeout : 1000 * 90, // default is `0` (no timeout)
      cancelToken: new CancelToken((cancel) => {}),
    };
    let optionsHeader;
    const token = Helper.getToken();
    if (token) {
      const userToken = `Bearer ${token}`;
      optionsHeader = {Authorization: userToken};
    }
    options.headers = {...optionsHeader};
    if (request.params) {
      options.params = request.params;
    }
    if (request.data) {
      options.data = request.data;
    }
    if (request.auth) {
      options.auth = request.auth;
    }
    const response = new axios.request(options);
    console.log('REQUEST => ', options);
    return response;
  }

  singleRequest(request) {
    return new Promise((resolve, reject) => {
      request
          .then((response) => {
            console.log('RESPONSE => ', response);
            resolve(response);
          })
          .catch((error) => {
            const dataMessage = _handleError(error);
            reject(dataMessage);
          });
    });
  }

  requestMultiple(requests) {
    return new Promise((resolve, reject) => {
      new axios.all(requests)
          .then((response) => {
            console.log('RESPONSE => ', response);
            resolve(response);
          })
          .catch((error) => {
            const dataMessage = _handleError(error);
            reject(dataMessage);
          });
    });
  }

  async login(args) {
    return this._request({
      url: 'api/auth/login',
      method: 'post',
      data: args,
    });
  }

  async register(args) {
    return this._request({
      url: 'api/auth/register',
      method: 'post',
      data: args,
    });
  }

  async addAttachment(args) {
    return this._request({
      url: 'api/public/attachment/upload',
      method: 'post',
      data: args,
    });
  }

  async getProfile() {
    return this._request({
      url: 'api/profile',
      method: 'get',
    });
  }

  async getProduct(args) {
    return this._request({
      url: 'api/public/product',
      method: 'get',
      params: args,
    });
  }

  async getProductDetail(args) {
    return this._request({
      url: `api/public/product/${args}`,
      method: 'get',
    });
  }

  async getProductUser() {
    return this._request({
      url: 'api/product',
      method: 'get',
    });
  }

  async addProduct(args) {
    return this._request({
      url: 'api/product',
      method: 'post',
      data: args,
    });
  }

  async editProduct(args, params) {
    return this._request({
      url: `api/product/${params.id}`,
      method: 'put',
      data: args,
    });
  }

  async deleteProduct(args) {
    return this._request({
      url: `api/product/${args.id}`,
      method: 'delete',
    });
  }

  async getCategory() {
    return this._request({
      url: 'api/public/category',
      method: 'get',
    });
  }

  async getDistrict() {
    return this._request({
      url: 'api/district',
      method: 'get',
    });
  }
}

function _handleError(error) {
  console.log('ERROR => ', error?.response ?? error);
  const status = error?.response?.status ?? null;
  let message = null;
  if (error.response && error.response.data) {
    message = error.response.data.message ||
      error.response.data.Message ||
      error.response.data.error;
  }
  if (status === 401) {
    message = '401';
  }
  if (status === 404) {
    message = 'Server not found';
  }
  if (status >= 500 || !message) {
    message = 'Oops! Something went wrong.\nPlease try again in a few minutes.';
  }
  const objMessage = {
    message,
    status,
    dataError: error?.response?.data ?? null,
    type: ALERT_TYPE.ERROR,
  };
  return objMessage;
}

const API = new Api();
export {API, terminateAPI};
