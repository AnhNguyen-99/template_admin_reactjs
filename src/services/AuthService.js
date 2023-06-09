const { API_BASE_URL } = require("env");

const API_URL_LOGIN = API_BASE_URL +  "acc/login-user";

const API_URL_REGISTER = API_BASE_URL + "acc/register-user";

const API_CUSTOMER_LOGIN = API_BASE_URL + "acc/login-customer";

const API_CUSTOMER_REGISTER = API_BASE_URL + "acc/register-customer";

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    const defaults = {headers: headers};
    console.log(options);
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

// =============================================================

// Đăng nhập thông tin tài khoản USER
export function login(username, password){
    var raw = JSON.stringify({
        "username": username,
        "password": password
      });

    return request({
        url: API_URL_LOGIN,
        method: 'POST',
        body: raw,
        redirect: 'follow'
    });
}


// Đăng ký thông tin tài khoản USER
export function register(username, email, password){
    var raw = JSON.stringify({
        "username": username,
        "email": email,
        "password": password
      });

    return request({
        url: API_URL_REGISTER,
        method: 'POST',
        body: raw,
        redirect: 'follow'
    });
}

// ==============================================================


// ==============================================================

// Đăng ký thông tin tài khoản khách hàng
export function register_customer(username, email, password) {
    var raw = JSON.stringify({
        "username": username,
        "email": email,
        "password": password
    });

    return request({
        url: API_CUSTOMER_REGISTER,
        method: 'POST',
        body: raw,
        redirect: 'follow'
    });
}

// Đăng nhập thông tin tài khoản khách hàng
export function login_customer(username, password) {
    var raw = JSON.stringify({
        'username': username,
        'password': password
    });

    return request({
        url: API_CUSTOMER_LOGIN,
        method: 'POST',
        body: raw,
        redirect: 'follow'
    });
}