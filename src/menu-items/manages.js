import { IconTypography, IconPalette, IconShadow, IconWindmill, IconApps } from '@tabler/icons';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill,
    IconApps
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
            url: '/utils/util-color',
            icon: icons.IconPalette,
            breadcrumbs: false
        },
        {
            id: 'util-shadow',
            title: 'Shadow',
            type: 'item',
            url: '/utils/util-shadow',
            icon: icons.IconShadow,
            breadcrumbs: false
        },

    ]
};

export default manages;
