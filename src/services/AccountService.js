const { API_BASE_URL } = require("env");

const API_URL_ACC = API_BASE_URL + "acc/";

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    const defaults = { headers: headers };
    console.log(options);
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
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
export function getListRole() {
    return request({
        url: API_URL_ACC + "list-role",
        method: 'GET'
    });
}
// Thêm mơi function
export function createFunction(name_function) {
    var raw = JSON.stringify({
        "name_function": name_function
    });

    return request({
        url: API_URL_ACC + "create-func",
        method: 'POST',
        body: raw,
        redirect: 'follow'
    });
}

// Cập nhật function
export function updateFunction(functions) {
    var raw = JSON.stringify({
        "name_function": functions.name_function
    });

    return request({
        url: API_URL_ACC + "update-func/" + functions.id,
        method: 'PUT',
        body: raw,
        redirect: 'follow'
    });
}

// Xóa function
export function deleteFunction(functions){
    return request({
        url: API_URL_ACC + "delete-func/" + functions.id,
        method: 'DELETE',
        redirect: 'follow'
    });
}