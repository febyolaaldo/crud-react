import axios from 'axios';
import qs from 'qs'

class Http {
  constructor(){
    let API =  axios.create({
      baseURL: `https://simple-contact-crud.herokuapp.com`
    });
    this.API = API;
    this.init()
  }
  request (method, path, params, data)  {
    return this.API.request({
      method: method,
      headers: {'Accept': 'application/json','Content-Type': 'application/x-www-form-urlencoded'},
      params: params,
      data: qs.stringify(data),
      url: path,
    }) 
    .then(response => {
      return response
    })
    .catch((error => {
      console.log(error)
    }))
  }
  post (path, params, data) {
    return this.request('POST', path, params, data)
  }
  get (path, params)  {
    return this.request('GET', path, params)
  }
  delete (path, params) {
    return this.request('DELETE', path, params)
  }
  patch (path, params, data) {
    return this.request('PATCH', path, params, data)
  }
  put (path, params, data) {
    return this.request('PUT', path, params, data)
  }
  init() {
    this.API.interceptors.request.use(function (config) {
      // Do something before request is sent
      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    });

    // Add a response interceptor
    this.API.interceptors.response.use(function (response) {
      // Do something with response data

      return response.data;
    }, function (error) {
      // Do something with response error
      return Promise.reject(error);
    });
  }
}

export default Http;