const { API_BASE_URL } = require("env")

const API_BASE = API_BASE_URL + "order/";

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    const defaults = {headers: headers};
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

// ========================================
// =============== ORDER ===============
// Lấy danh sách order
export function getListOrder(){
    return request({
        url: API_BASE + "list-order",
        method: 'GET'
    });
}




// ========================================
// =============== ORDERITEM ===============
// Lấy danh sách orderItem
export function getListOrderItemByOrderId(id){
    return request({
        url: API_BASE + "orderdetail/" + id,
        method: 'GET'
    });
}