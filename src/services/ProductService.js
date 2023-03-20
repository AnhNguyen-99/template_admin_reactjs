const { API_BASE_URL } = require("env")

const API_BASE_CATEGORY = API_BASE_URL + "product/";
const API_BASE_SUBCATEGORY = API_BASE_URL + "product/"

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    const defaults = {headers: headers};
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

// ========================================
// =============== CATEGORY ===============
// Tạo mới danh mục

export function createCategory(category) {
    var raw = JSON.stringify({
        "category_name": category.category_name,
        "create_id": 1,
        "update_id": 1
    });

    return request({
        url: API_BASE_CATEGORY + "create-category",
        method: 'POST',
        body: raw,
        redirect: 'follow'
    });
}

// Lấy danh sách danh mục
export function getlistCategory() {
    return request({
        url: API_BASE_CATEGORY + "list-category",
        method: 'GET'
    });
}

// Xóa danh mục 
export function deleteCategory(id) {
    return request({
        url: API_BASE_CATEGORY + "delete-category/" + id,
        method: 'DELETE',
        redirect: 'follow'
    });
}

// Cập nhật danh mục
export function updateCategory(category, id) {
    var raw = JSON.stringify({
        'category_name': category.category_name,
        'create_id': 1,
        'update_id': 1,
    });

    return request({
        url: API_BASE_CATEGORY + 'update-category/' + id,
        method: 'PUT',
        body: raw,
        redirect: 'follow'
    });
}

// ================================================

// ================================================
// =========== SUB CATEGORY =======================

// Tạo mới một thư mục con
export function createSub(subcategory) {
    var raw = JSON.stringify({
        "sub_category": subcategory.sub_category
    });

    return request({
        url: API_BASE_SUBCATEGORY + "create-sub",
        method: 'POST',
        body: raw,
        redirect: 'follow'
    });
}

// Cập nhật danh mục con
export function updateSub(subcategory, id) {
    var raw = JSON.stringify({
        "sub_category": subcategory.sub_category
    });

    return request({
        url: API_BASE_SUBCATEGORY + "update-sub/" + id,
        method: 'PUT',
        body: raw,
        redirect: 'follow'
    });
}

export function deleteSub(id) {
    
    return request({
        url: API_BASE_SUBCATEGORY + "delete-sub/" + id,
        method: 'DELETE',
        redirect: 'follow' 
    });
}
