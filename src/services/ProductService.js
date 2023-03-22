const { API_BASE_URL } = require("env")

const API_BASE_CATEGORY = API_BASE_URL + "product/";

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);
    console.log(options);
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

export function createCategory(category_name, sub_category) {
    var raw = JSON.stringify({
        "category_name": category_name,
        "sub_category": sub_category,
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
export function deleteCategory(category) {
    return request({
        url: API_BASE_CATEGORY + "delete-category/" + category.id,
        method: 'DELETE',
        redirect: 'follow'
    });
}

// Cập nhật danh mục
export function updateCategory(category) {
    var raw = JSON.stringify({
        'category_name': category.category_name,
        'sub_category': category.sub_category,
        'create_id': 1,
        'update_id': 1,
    });

    return request({
        url: API_BASE_CATEGORY + 'update-category/' + category.id,
        method: 'PUT',
        body: raw,
        redirect: 'follow'
    });
}

// ================================================