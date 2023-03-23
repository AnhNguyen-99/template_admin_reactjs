import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const ManageCategory = Loadable(lazy(() => import('views/manages/category/ListCategory')));
const ManageRole = Loadable(lazy(() => import('views/manages/role/ListRole')));
const ManageFunction = Loadable(lazy(() => import('views/manages/function/ListFunction')));
const ManageBranch = Loadable(lazy(() => import('views/manages/branch/ListBranch')));
const ManageSupplier = Loadable(lazy(() => import('views/manages/supplier/ListSupplier')));
const ManageCustomer = Loadable(lazy(() => import('views/manages/customer/ListCustomer')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-typography',
                    element: <UtilsTypography />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-color',
                    element: <UtilsColor />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-shadow',
                    element: <UtilsShadow />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'tabler-icons',
                    element: <UtilsTablerIcons />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'material-icons',
                    element: <UtilsMaterialIcons />
                }
            ]
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        },
        {
            path: 'manage',
            children: [
                {
                    path: 'customer',
                    element: <ManageCustomer />
                },
                {
                    path: 'category',
                    element: <ManageCategory/>
                },
                {
                    path: 'branch',
                    element: <ManageBranch/>
                },
                {
                    path: 'role',
                    element: <ManageRole/>
                }, 
                {
                    path: 'function',
                    element: <ManageFunction/>
                },
                {
                    path: 'supplier',
                    element: <ManageSupplier/>
                }
            ]
        }
    ]
};

export default MainRoutes;
