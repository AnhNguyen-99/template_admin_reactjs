const { API_BASE_URL } = require("env")

const API_BASE = API_BASE_URL + "product/";

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

export function createCategory(category) {
    var raw = JSON.stringify({
        "category_name": category.category_name,
        "sub_category": category.sub_category,
    });

    return request({
        url: API_BASE + "create-category",
        method: 'POST',
        body: raw,
        redirect: 'follow'
    });
}

// Lấy danh sách danh mục
export function getlistCategory() {
    return request({
        url: API_BASE + "list-category",
        method: 'GET'
    });
}

// Xóa danh mục 
export function deleteCategory(category) {
    return request({
        url: API_BASE + "delete-category/" + category.id,
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
        url: API_BASE + 'update-category/' + category.id,
        method: 'PUT',
        body: raw,
        redirect: 'follow'
    });
}

// ================================================


// =================================================
// ================= BRANCH ========================

// Tạo mới branch
export function createBranch(branch_name) {
    var raw = JSON.stringify({
        "branch_name": branch_name
    });

    return request({
        url: API_BASE + "create-branch",
        method: 'POST',
        body: raw,
        redirect: 'follow',
    });
}

// Hiển thị danh sách các branch
export function getListBranch() {
    return request({
        url: API_BASE + "list-branch",
        method: "GET"
    });
}

// Cập nhật branch
export function updateBranch(branch) {
    var raw = JSON.stringify({
        'branch_name': branch.branch_name
    });

    return request({
        url: API_BASE + 'update-branch/' + branch.id,
        method: "PUT",
        body: raw,
        redirect: 'follow'
    });
}

// Xóa branch
export function deleteBranch(branch) {
    return request({
        url: API_BASE + 'delete-branch/' + branch.id,
        method: 'DELETE',
        redirect: 'follow'
    });
}


// ==============================================================
// ======================= SUPPLIER =============================

// Hiển thị danh sách các Supplier
export function getListSupplier() {
    return request({
        url: API_BASE + 'list-supplier',
        method: 'GET'
    })
}


// Tạo mới một Supplier
export function createSupplier(supplier) {
    var raw = JSON.stringify({
        'supplier_name': supplier.supplier_name,
        'phone': supplier.phone,
        'code_tax': supplier.code_tax,
        'email': supplier.email,
        'address': supplier.address,
        'province': supplier.province,
        'district': supplier.district,
        'wards': supplier.wards,
        'group_supplier': supplier.group_supplier,
        'note': supplier.note
    });

    return request({
        url: API_BASE + 'create-supplier',
        body: raw,
        method: 'POST',
        redirect: 'follow'
    });
}

// Cập nhật Supplier
export function updateSupplier(supplier) {
    var raw = JSON.stringify({
        'supplier_name': supplier.supplier_name,
        'phone': supplier.phone,
        'code_tax': supplier.code_tax,
        'email': supplier.email,
        'address': supplier.address,
        'province': supplier.province,
        'district': supplier.district,
        'wards': supplier.wards,
        'group_supplier': supplier.group_supplier,
        'note': supplier.note
    });

    return request({
        url: API_BASE + 'update-supplier/' + supplier.id,
        body: raw,
        method: 'PUT',
        redirect: 'follow'
    });
}

// Xóa các supplier
export function deleteSupplier(supplier) {
    return request({
        url: API_BASE + 'delete-supplier/' + supplier.id,
        method: 'DELETE'
    });
}
// ==============================================================