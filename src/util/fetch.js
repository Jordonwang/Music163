import axios from './http'
import store from '@/store/'
/*
 axios#request(config)
 axios#get(url[, config])
 axios#delete(url[, config])
 axios#head(url[, config])
 axios#options(url[, config])
 axios#post(url[, data[, config]])
 axios#put(url[, data[, config]])
 axios#patch(url[, data[, config]])
 */

export default async(url = '', data = {}, type = 'GET') => {
  type = type.toLowerCase();
  // url = axios.defaults.baseURL + url;
  store.commit('UPDATE_LOADING',true)

  return new Promise((resolve, reject) => {

    var request = null
    if(type == 'post' || type == 'put' || type == 'patch'){
      request = axios({
        method: type,
        url: url,
        data: data
      });
    }else {
      request = axios({
        method: type,
        url: url,
        params: data,
        // headers:{"Access-Control-Allow-Origin":"*"}
      });
    }

    request.then(response =>{
      // loading
      // 如果http状态码正常，则直接返回数据

      store.commit('UPDATE_LOADING',false)
      if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
        resolve(response.data);
      }
      // 异常状态下，把错误信息返回去
      resolve({
        status: -404,
        msg: '网络异常'
      });
    }, err => {
      reject(err);
      store.commit('UPDATE_LOADING',false)
    }).catch((error) => {
      reject(error)
      store.commit('UPDATE_LOADING',false)
    })
  })
}
