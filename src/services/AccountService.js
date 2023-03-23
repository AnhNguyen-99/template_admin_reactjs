const { API_BASE_URL } = require("env");

const API_URL_ACC = API_BASE_URL + "acc/";

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    const defaults = { headers: headers };
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


// =======================================================
// =================== FUCNTION ==========================

// Lấy danh sách các function
export function getListFunction() {
    return request({
        url: API_URL_ACC + "list-func",
        method: 'GET'
    });
}

// Thêm mới function
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
// ====================================================================


// ====================================================================
// ============================== ROLE ================================
// Lấy danh sách các khách hàng
export function getListCustomer() {
    return request({
        url: API_URL_ACC + "list-customer",
        method: 'GET'
    })
}

// Tạo mới khách hàng
export function createCustomer(customer) {
    var raw = JSON.stringify({
        'username': customer.username,
        'customer_code': customer.customer_code,
        'code_tax': customer.code_tax,
        'phone': customer.phone,
        'email': customer.email,
        'gender': customer.gender,
        'date': customer.date,
        'address': customer.address,
        'province': customer.province,
        'district': customer.district,
        'ward': customer.ward,
        'type': customer.type,
        'company_name': customer.company_name,
        'image': customer.image
    })

    return request({
        url: API_URL_ACC + "create-customer",
        method: "POST",
        body: raw,
        redirect: 'follow'
    })
}

// Cập nhật Customer
export function updateCustomer(customer) {
    var raw = JSON.stringify({
        'username': customer.username,
        'customer_code': customer.customer_code,
        'code_tax': customer.code_tax,
        'phone': customer.phone,
        'email': customer.email,
        'gender': customer.gender,
        'date': customer.date,
        'address': customer.address,
        'province': customer.province,
        'district': customer.district,
        'ward': customer.ward,
        'type': customer.type,
        'company_name': customer.company_name,
        'image': customer.image
    });

    return request({
        url: API_URL_ACC + "update-customer/" + customer.id,
        method: "PUT",
        body: raw,
        redirect: 'follow'
    });
}

// Xóa các customer
export function deleteCustomer(customer) {
    return request({
        url: API_URL_ACC + "delete-customer/" + customer.id,
        method: 'DELETE'
    });
}

// ====================================================================



// ====================================================================
// ============================== ROLE ================================

// Lấy danh sách các Role 
export function getListRole() {
    return request({
        url: API_URL_ACC + "list-role",
        method: 'GET'
    });
}


// ======================================================================
// =============================== TỈNH =================================

// Lấy danh sách tỉnh
export function getListProvince(){
    return request({
        url: API_URL_ACC + "list-province",
        method: 'GET'
    });
}

// Lấy danh sách huyện theo id Tỉnh
export function getListDistricByProvinceId(id){
    return request({
        url: API_URL_ACC + "list-distric/" + id,
        method: 'GET'
    });
}

// Lấy danh sách các xã theo Id Quận/Huyện
export function getListWardbyDistrictId(id) {
    return request({
        url: API_URL_ACC + "list-ward/" + id,
        method: 'GET'
    })
}