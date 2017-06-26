/*************************************************************************
 * ULLINK CONFIDENTIAL INFORMATION
 * _______________________________
 *
 * All Rights Reserved.
 *
 * NOTICE: This file and its content are the property of Ullink. The
 * information included has been classified as Confidential and may
 * not be copied, modified, distributed, or otherwise disseminated, in
 * whole or part, without the express written permission of Ullink.
 ************************************************************************/

import axios from 'axios';
import { displayAuthError } from 'reducers/authentication';

const setupAxiosInterceptors = onUnauthenticated => {
  const onRequestSuccess = config => {
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    config.timeout = 10000;
    return config;
  };
  const onResponseSuccess = (response) => response;
  const onResponseError = error => {
    if (error.response.status == 403 && !error.response.config.noRedirect) {
      onUnauthenticated();
    }
    return Promise.reject(error);
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export {
  setupAxiosInterceptors
};
