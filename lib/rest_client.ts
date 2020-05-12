'use strict';

import logger from "./log";

const OAuth = require('oauth-1.0a');
const request = require('request');

export interface RestClientOptions {
  version: string
  url: string
  consumerKey?: string
  consumerSecret?: string
  accessToken?: string
  accessTokenSecret?: string
  basicAuth?: {
    user?: string
    password?: string
    enabled: boolean
  }
}

type RequestToken = string

interface GetCall {
  (resourceUrl: string, request_token?: RequestToken): Promise<any>
}
interface PostCall {
  (resourceUrl: string,data?: any, request_token?: RequestToken): Promise<any>
}
interface PutCall {
  (resourceUrl: string,data?: any, request_token?: RequestToken): Promise<any>
}
interface DeleteCall {
  (resourceUrl: string, request_token?: RequestToken): Promise<any>
}

interface RequestData {
  url: string
  method: string,
  body?: any
}

export interface RestClientInstance {
  consumerToken: (login_data: any) => any
  get: GetCall
  post: PostCall
  put: PutCall
  delete: DeleteCall
}

export const RestClient = function (options: RestClientOptions): RestClientInstance {

  const serverUrl = options.url;
  let oauth = OAuth({
    consumer: {
      public: options.consumerKey,
      secret: options.consumerSecret
    },
    signature_method: 'HMAC-SHA1'
  });
  let token = {
    public: options.accessToken,
    secret: options.accessTokenSecret
  };

  function apiCall(request_data: RequestData, request_token: RequestToken ='') {
    logger.debug('Calling API endpoint: ' + request_data.method + ' ' + request_data.url + ' token: ' + request_token);

    let requestParameter: Record<string, any> = {
      url: request_data.url,
      method: request_data.method,
      json: true,
      body: request_data.body,
    }

    if (options.basicAuth?.enabled) {
      const { password, user } = options.basicAuth
      if (password && user) {
        requestParameter.auth = {
          user: user,
          pass: password,
          sendImmediately: false
        }
      }
    } else {
      requestParameter.headers = request_token ? { 'Authorization': 'Bearer ' + request_token } : oauth.toHeader(oauth.authorize(request_data, token))
    }

    logger.info(requestParameter);
    /* eslint no-undef: off*/
    return new Promise(function (resolve, reject) {
      request(requestParameter, function (error, response, body) {
        logger.debug('Response received')
        if (error) {
          logger.error('Error occured: ' + error);
          reject(error);
          return;
        } else if (!httpCallSucceeded(response)) {
          let errorMessage = ''

          if (body) {
            errorMessage = 'HTTP ERROR ' + body.code;
          } else {
            errorMessage = 'HTTP ERROR ' + response.code;
          }

          if (body && body.hasOwnProperty('result'))
            errorMessage = errorString(body.result, body.hasOwnProperty('parameters') ? body.parameters : {});

          logger.error('API call failed: ' + errorMessage);
          reject(errorMessage);
        }
        resolve(body);
      });
    });
  }

  const consumerToken = (login_data: any) => {
    return apiCall({
      url: createUrl('/integration/customer/token'),
      method: 'POST',
      body: login_data
    })
  }

  const getCall: GetCall = (resourceUrl, request_token: RequestToken ='') => {
    const request_data: RequestData = {
      url: createUrl(resourceUrl),
      method: 'GET'
    };
    return apiCall(request_data, request_token);
  }

  const postCall: PostCall = (resourceUrl, data, request_token: RequestToken ='') => {
    const request_data: RequestData = {
      url: createUrl(resourceUrl),
      method: 'POST',
      body: data
    };
    return apiCall(request_data, request_token);
  }

  const putCall: PutCall = (resourceUrl, data, request_token: RequestToken ='') => {
    const request_data: RequestData = {
      url: createUrl(resourceUrl),
      method: 'PUT',
      body: data
    };
    return apiCall(request_data, request_token);
  }

  const deleteCall: DeleteCall = (resourceUrl, request_token: RequestToken ='') => {
    const request_data: RequestData = {
      url: createUrl(resourceUrl),
      method: 'DELETE'
    };
    return apiCall(request_data, request_token);
  }

  function httpCallSucceeded(response: any) {
    return response.statusCode >= 200 && response.statusCode < 300;
  }

  function errorString(message: string, parameters: null|Array<any>|object): string {
    if (parameters === null) {
      return message;
    }
    let parameterPlaceholder
    if (parameters instanceof Array) {
      for (let i = 0; i < parameters.length; i++) {
        parameterPlaceholder = '%' + (i + 1).toString();
        message = message.replace(parameterPlaceholder, parameters[i]);
      }
    } else if (parameters instanceof Object) {
      for (let key in parameters) {
        parameterPlaceholder = '%' + key;
        message = message.replace(parameterPlaceholder, parameters[key]);
      }
    }

    return message;
  }

  function createUrl(resourceUrl: string) {
    return serverUrl + '/' + resourceUrl;
  }

  return {
    consumerToken,
    get: getCall,
    post: postCall,
    put: putCall,
    delete: deleteCall
  };
}
