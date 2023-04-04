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


// ==============================================================
// ========================= PRODUCT ============================

// Hiển thị danh sách sản phẩm
export function getlistProduct() {
    return request({
        url: API_BASE + 'list-product',
        method: "GET"
    })
}

// Tạo một sản phẩm mới
export function createProduct(product) {
    var raw = JSON.stringify({
        "name": product.name,
        "cost_price": product.cost_price,
        "price": product.price,
        "direct_sales": product.direct_sales,
        "image_product": product.image_product,
        "unit": product.unit,
        "detail_description": product.detail_description,
        "product_code": product.product_code,
        "branch": product.branch,
        "category": product.category
    })

    return request({
        url: API_BASE + "create-product",
        body: raw,
        method: 'POST',
        redirect: 'follow'
    })
}

// Cập nhật thông tin sản phẩm mới
export function updateProduct(product) {
    var raw = JSON.stringify({
        "name": product.name,
        "cost_price": product.cost_price,
        "weight": product.weight,
        "price": product.price,
        "direct_sales": product.direct_sales,
        "image_product": product.image_product,
        "unit": product.unit,
        "detail_description": product.detail_description,
        "product_code": product.product_code,
    })

    return request({
        url: API_BASE + "update-product/" + product.id,
        body: raw,
        method: 'PUT',
        redirect: 'follow'
    })
}


// Xóa thông tin sản phẩm
export function deleteProduct(product) {
    return request({
        url: API_BASE + "delete-product/" + product.id,
        method: 'DELETE'
    })
}

// ==============================================================


// ==============================================================
// ========================= IMPORT =============================

// Tạo mới thông tin phiếu nhập hàng
export function createImport(imports) {
    var raw = JSON.stringify({
        "code": imports.code,
        "supplier": imports.supplier,
        "total_price": imports.total_price
    });

    return request({
        url: API_BASE + "create-import",
        method: "POST",
        body: raw,
        redirect: "follow"
    });
}

// Cập nhật thông tin phiếu nhập hàng
export function updateImport(imports) {
    var raw = JSON.stringify({
        "code": imports.code,
        "supplier_code": imports.supplier_code,
        "total_price": imports.total_price
    });

    return request({
        url: API_BASE + "update-import/" + imports.id,
        method: "PUT",
        body: raw,
        redirect: "follow"
    });
}

// Hiển thị danh sách phiếu nhập hàng
export function getlistImport() {
    return request({
        url: API_BASE + "list-import",
        method: "GET"
    })
}


// Xóa phiếu nhập hàng
export function deleteImport(imports) {
    return request({
        url: API_BASE + "delete-import/" + imports.id,
        method: "DELETE"
    })
}

// ==============================================================


// ==============================================================
// ========================== SALES =============================

// Tạo mới mã sales
export function createSales(sales) {
    var raw = JSON.stringify({
        'sale_code': sales.sale_code,
        'sales': sales.sales,
        'date_sale': sales.date_sale,
        'finish_sale': sales.finish_sale,
        'product': sales.product
    });

    return request({
        url: API_BASE + 'create-sale',
        method: 'POST',
        body: raw,
        redirect: 'follow'
    });
}


// Cập nhật thông tin sales
export function updateSale(sales) {
    var raw = JSON.stringify({
        'sale_code': sales.sale_code,
        'sales': sales.sales,
        'date_sale': sales.date_sale,
        'finish_sale': sales.finish_sale,
        'product': sales.product
    });

    return request({
        url: API_BASE + 'update-sale/' + sales.id,
        method: 'PUT',
        body: raw,
        redirect: 'follow'
    });
}

// Hiển thị ra danh sách các mã sales
export function getListSales() {
    return request({
        url: API_BASE + 'list-sales',
        method: 'GET'
    })
}

// Xóa các mã sale
export function deleteSales(sales) {
    return request({
        url: API_BASE + 'delete-sale/' + sales.id,
        method: 'DELETE'
    })
}

// ==============================================================