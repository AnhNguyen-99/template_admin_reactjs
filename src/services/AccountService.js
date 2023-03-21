const { API_BASE_URL } = require("env");

const API_URL_ACC = API_BASE_URL +  "acc/";

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

export function getListFunction() {
    return request({
        url: API_URL_ACC + "list-func",
        method: 'GET'
    });
}