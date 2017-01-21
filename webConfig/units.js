/**
 * Created by Administrator on 2016/9/7.
 */
import { browserHistory } from 'react-router'
import 'whatwg-fetch'
export function requireCredentials(nextState, replace, next) {
    sysGet('/ssl/loginStatus').then(function (data) {
        console.log(data)
        if (!data || data.status == 401) {
            replace('/login');
        }
        next();
    }).catch(function (err) {
        console.log(err)
        replace('/login');
        next();
    })
}
export function sysGet(url, param) {
    let query = [];
    for (var paramName in param) {
            query.push(encodeURIComponent(paramName) + '=' + encodeURIComponent(param[paramName]));
    }
    query = query.join('&')
    if (query) {
        url = `${url}?${query}`
    }
    return fetch(url, {credentials: 'same-origin'}).then(function (response) {
        if (response.status == 200) {
            return response.json()
        } else {
            if (response.status == 401) {
                return {
                    status: 401
                }
            } else {
                return null
            }

        }

    }).then(function (json) {
        return json
    }).catch(function (error) {
     console.log(error)
    })
}
export function sysPost(url, param) {
    return fetch(url, {
        method: 'post',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(param)
    }).then(function (data) {
        if (data.status == 401) {
            browserHistory.replace('/login');
            return {status: 401}
        }
        if (data.status == 200) {
            return data.json()
        }
        if (data.status == 404) {
            return {status: 404}
        }
        return {
            status:data.status,
            data:data.json()
        }

    })
}