import { 
    IconTypography, 
    IconPalette, 
    IconShadow, 
    IconWindmill, 
    IconApps,
    IconBox,
    IconBriefcase,
    IconUsers,
    IconUser,
    IconMenu2, 
    IconBuildingWarehouse,
    IconDiscount
} from '@tabler/icons';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill,
    IconApps,
    IconBox,
    IconBriefcase,
    IconUsers,
    IconUser,
    IconMenu2,
    IconBuildingWarehouse,
    IconDiscount
};

const manages = {
    id: 'pages',
    title: 'Manages',
    type: 'group',
    children: [
        
        {
            id: 'user',
            title: 'Manage User',
            type: 'collapse',
            icon: icons.IconMenu2,
            children: [
                {
                    id: 'manage-staff',
                    title: "Manage Employee",
                    type: 'item',
                    url: '/manage/employee',
                    icon: icons.IconUser,
                    breadcrumbs: false
                },
                {
                    id: 'manage-customer',
                    title: "Manage Customer",
                    type: 'item',
                    url: '/manage/customer',
                    icon: icons.IconUsers,
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'manage_category',
            title: 'Manage Category',
            type: 'item',
            url: '/manage/category',
            icon: icons.IconApps,
            breadcrumbs: false
        },
        {
            id: 'manage_branch',
            title: 'Manage Branch',
            type: 'item',
            url: '/manage/branch',
            icon: icons.IconBox,
            breadcrumbs: false
        },
        {
            id: 'manage_role',
            title: 'Manage Role',
            type: 'item',
            url: '/manage/role',
            icon: icons.IconShadow,
            breadcrumbs: false
        },
        {
            id: 'manage_function',
            title: 'Manage Function',
            type: 'item',
            url: '/manage/function',
            icon: icons.IconShadow,
            breadcrumbs: false
        },
        {
            id: 'manage_supplier',
            title: 'Manage Supplier',
            type: 'item',
            url: '/manage/supplier',
            icon: icons.IconBriefcase,
            breadcrumbs: false
        },
        {
            id: 'manage_product',
            title: 'Manage Product',
            type: 'item',
            url: '/manage/product',
            icon: icons.IconShadow,
            breadcrumbs: true
        },
        {
            id: 'import_warehouse',
            title: "Import Warehouse",
            type: 'item',
            url: '/manage/warehouse',
            icon: icons.IconBuildingWarehouse,
            breadcrumbs: true
        },
        {
            id: 'manage_sales',
            title: "Manage Sales",
            type: 'item',
            url: '/manage/sales',
            icon: icons.IconDiscount,
            breadcrumbs: true
        }
    ]
};

export default manages;
