const { API_BASE_URL } = require("env");

const API_URL_ACC = API_BASE_URL + "acc/";

const request = async (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);

    const response = await fetch(options.url, options);
    const json = await response.json();
    if (!response.ok) {
        return Promise.reject(json);
    }
    return json;
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
        'wards': customer.wards,
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
        'date': new Date(customer.date),
        'address': customer.address,
        'province': customer.province,
        'district': customer.district,
        'wards': customer.wards,
        'type': customer.type,
        'company_name': customer.company_name,
        'image': customer.image,
        'note': customer.note,
        'password': customer.password
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
// ============================ USER ==================================

// Tạo mới danh sách user
export function createUser(user) {
    var raw = JSON.stringify({
        'username': user.username,
        'code': user.code,
        'phone': user.phone,
        'email': user.email,
        'gender': user.gender,
        'date': user.date,
        'address': user.address,
        'province': user.province,
        'district': user.district,
        'wards': user.wards,
        'note': user.note,
        'image': user.image
    })

    return request({
        url: API_URL_ACC + "create-user",
        method: "POST",
        body: raw,
        redirect: 'follow'
    })
}

// Lấy danh sách các user
export function getListUser() {
    return request({
        url: API_URL_ACC + "list-user",
        method: "GET"
    })
}

// Cập nhật tài khoản user
export function updateUser(user) {
    const date = (new Intl.DateTimeFormat('en-US').format(new Date(user.date))).split("/");
    const date1Str = date[0] < 10 ? '0' + date[0] : date[0];
    const date2Str = date[1] < 10 ? '0' + date[1] : date[1];
    const date3Str = date[2] < 10 ? '0' + date[2] : date[2];
    const dateStr = date3Str + '-' + date2Str + '-' + date1Str;
    var raw = JSON.stringify({
        'username': user.username,
        'code': user.code,
        'phone': user.phone,
        'email': user.email,
        'gender': user.gender === 0 ? true : false,
        'date': dateStr,
        'address': user.address,
        'province': user.province,
        'district': user.district,
        'wards': user.wards,
        'note': user.note,
        'image': user.image,
        'password': '123456'
    });

    return request({
        url: API_URL_ACC + "update-user/" + user.id,
        body: raw,
        method: "PUT",
        redirect: 'follow'
    });
}

// Xóa tài khoản user
export function deleteUser(user) {
    return request({
        url: API_URL_ACC + "delete-user/" + user.id,
        method: 'DELETE'
    });
}



// ====================================================================
// ============================== ROLE ================================

// Lấy danh sách các Role 
export function getListRole() {
    return request({
        url: API_URL_ACC + "list-role",
        method: 'GET'
    });
}

// Tạo mới Role
export function createRole(role) {
    var raw = JSON.stringify({
        'role_name': role.role_name
    });

    return request({
        url: API_URL_ACC + "create-role",
        method: 'POST',
        body: raw,
        redirect: "follow"
    });
}

// Xóa role theo id
export function deleteRole(role) {
    return request({
        url: API_URL_ACC + "delete-role/" + role.id,
        method: 'DELETE'
    });
}

// Cập nhật role theo id
export function updateRole(role) {
    var raw = JSON.stringify({
        'role_name': role.role_name,
    });

    return request({
        url: API_URL_ACC + "update-role/" + role.id,
        method: 'PUT',
        body: raw,
        redirect: 'follow'
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


// =================== Permission ====================== //
// Tạo mới chức năng role
export function createPermission(permission){
    var raw = JSON.stringify({
        'function': permission.function_id,
        'role': permission.role_id,
        'action': permission.action
    });

    return request({
        url: API_URL_ACC + "create-permission",
        method: 'POST',
        body: raw,
        redirect: "follow"
    });
}

// Lấy ds chức năng theo roleId
export function getListPermission2(id) {
    return request({
        url: API_URL_ACC + "list-permission/" + id,
        method: 'GET'
    })
}