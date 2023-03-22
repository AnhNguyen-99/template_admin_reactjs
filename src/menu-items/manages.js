import { 
    IconTypography, 
    IconPalette, 
    IconShadow, 
    IconWindmill, 
    IconApps,
    IconBox,
    IconBriefcase  
} from '@tabler/icons';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill,
    IconApps,
    IconBox,
    IconBriefcase
};

const manages = {
    id: 'pages',
    title: 'Manages',
    type: 'group',
    children: [
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
    ]
};

export default manages;
