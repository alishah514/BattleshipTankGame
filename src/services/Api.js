import axios from 'axios';
import axiosRetry from 'axios-retry';
import {Alert, Platform} from 'react-native';
import * as Storage from './StorageService';
import {Constants} from '../constants/Constants';

class Api {
  constructor() {
    this.apiUrl = Constants.BASE_URL;
    let service = axios.create({
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const retryDelay = (retryNumber = 0) => {
      const seconds = Math.pow(2, retryNumber) * 1000;
      const randomMs = 1000 * Math.random();
      return seconds + randomMs;
    };

    axiosRetry(service, {
      retries: 2,
      retryDelay,
      // retry on Network Error & 5xx responses
      retryCondition: axiosRetry.isRetryableError,
    });

    service.interceptors.response.use(this._handleSuccess);
    this.service = service;
  }

  _handleSuccess(response) {
    return response;
  }

  _handleError = error => {
    switch (error.response && error.response.status) {
      case 401:
        // toast.error('Unauthorized, check console for details');
        Alert.alert('Unauthorized, check console for details');
        break;
      case 404:
        // toast.error('Route not found, check console for details');
        Alert.alert('Route not found, check console for details');
        break;
      default:
        // toast.error('Server/Unknown error occurred, check console for details');
        Alert.alert('Server/Unknown error occurred, check console for details');
        break;
    }
    return Promise.reject(error);
  };

  _redirectTo = (document, path) => {
    document.location = path;
  };

  /**
   * Method to handle api requests.
   * @param {string} type
   * @param {string} path
   * @param {Object} [payload]
   */
  async request(type, path, payload, bearerToken) {
    console.log('params:', payload);

    type = Platform.OS === 'android' ? type.toUpperCase() : type;

    if (path.includes('http') || path.includes('https')) {
      if (path.startsWith('/')) path = path.substr(path.indexOf('/') + 1);
    } else {
      path = this.apiUrl + path;
      console.log('path=', path);
    }

    //Load token from local storage if not available in request
    if (typeof bearerToken === 'undefined') {
      bearerToken = await Storage.getData(Constants.BEARER_TOKEN);
      // console.log('token:', bearerToken);
    }

    if (bearerToken) {
      this.service.defaults.headers.Authorization = `Bearer ${bearerToken}`;
    }

    if (type === 'get') {
      return this.service.get(path).then(response => response.data);
    }

    return this.service
      .request({
        method: type,
        url: path,
        responseType: 'json',
        data: payload,
      })
      .then(response => {
        // console.log('Response:', response.data);
        if (response.data.StatusCode === 403) {
          console.log('Error:', response.data.Message);
          Alert.alert(`${response.data.Message}`);
        } else {
          return response.data;
        }
      })
      .catch(error => {
        console.log('Error:', error);
        if (
          error.response &&
          error.response.status === 400 &&
          error.response.data
        ) {
          return this.handleValidationErrors(error.response.data);
        } else {
          this.handleUnexpectedError(error.message);
          return {error: 'An unexpected error occurred.'};
        }
      });
  }

  handleValidationErrors(data) {
    const {Message, ModelState} = data;
    let errorMessage = 'Unknown validation error';
    for (const key in ModelState) {
      if (ModelState.hasOwnProperty(key) && ModelState[key].length > 0) {
        errorMessage = ModelState[key][0];
        break;
      }
    }
    Alert.alert(`${errorMessage}`);
    return {error: errorMessage};
  }

  handleUnexpectedError(message) {
    Alert.alert(message);
    console.error('Unexpected Error:', message);
  }
}

export default new Api();
