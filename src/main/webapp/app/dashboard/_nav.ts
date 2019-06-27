export const navigation = [
    {
        name: 'Entities',
        url: '',
        icon: 'icon-people',
        authorities: ['ROLE_USER'],
        children: [
            {
                name: 'Party Parameters',
                url: 'party-parameters',
                authorities: ['ROLE_USER'],
                icon: 'icon-folder-alt'
            },
            {
                name: 'Product Parameters',
                url: 'product-parameters',
                authorities: ['ROLE_USER'],
                icon: 'icon-bag'
            },
            {
                name: 'Transaction Rule',
                url: 'transaction-rule',
                authorities: ['ROLE_USER'],
                icon: 'icon-book-open'
            },
            {
                name: 'Financial Product',
                url: 'financial-product',
                authorities: ['ROLE_USER'],
                icon: 'icon-basket-loaded'
            },
            {
                name: 'Work Type',
                url: 'work-type',
                authorities: ['ROLE_USER'],
                icon: 'icon-user'
            },
            {
                name: 'Object Source',
                url: 'object-source',
                authorities: ['ROLE_USER'],
                icon: 'icon-user'
            }
            // ---- jhipster-needle-add-entity-to-nav-menu -----------
        ]
    },
    {
        name: 'Master',
        url: '',
        icon: 'icon-directions',
        authorities: ['ROLE_ADMIN'],
        children: [
            {
                name: 'Feature',
                url: 'feature',
                authorities: ['ROLE_USER'],
                icon: 'icon-user'
            },
            {
                name: 'Feature Applicable',
                url: 'feature-applicable',
                authorities: ['ROLE_USER'],
                icon: 'icon-user'
            },
            {
                name: 'Good',
                url: 'good',
                authorities: ['ROLE_USER'],
                icon: 'icon-user'
            },
            {
                name: 'Uom',
                url: 'uom',
                authorities: ['ROLE_USER'],
                icon: 'icon-user'
            },
            {
                name: 'Uom Type',
                url: 'uom-type',
                authorities: ['ROLE_USER'],
                icon: 'icon-user'
            },
            {
                name: 'Category Scheme',
                url: 'category-scheme',
                authorities: ['ROLE_USER'],
                icon: 'icon-user'
            },
            {
                name: 'Product Category Type',
                url: 'product-category-type',
                authorities: ['ROLE_USER'],
                icon: 'icon-user'
            },
            {
                name: 'Product Category',
                url: 'product-category',
                authorities: ['ROLE_USER'],
                icon: 'icon-user'
            },
            {
                name: 'Product Classification',
                url: 'product-classification',
                authorities: ['ROLE_USER'],
                icon: 'icon-user'
            },
            {
                name: 'Product Type',
                url: 'product-type',
                authorities: ['ROLE_USER'],
                icon: 'icon-user'
            },
            {
                name: 'Party Category',
                url: 'party-category',
                authorities: ['ROLE_USER'],
                icon: 'icon-user'
            },
            {
                name: 'Party Category Type',
                url: 'party-category-type',
                authorities: ['ROLE_USER'],
                icon: 'icon-user'
            },
            {
                name: 'Party Classification',
                url: 'party-classification',
                authorities: ['ROLE_USER'],
                icon: 'icon-user'
            },
            {
                name: 'Feature Type',
                url: 'feature-type',
                authorities: ['ROLE_USER'],
                icon: 'icon-user'
            },
            {
                name: 'Rule Type',
                url: 'rule-type',
                authorities: ['ROLE_USER'],
                icon: 'icon-user'
            }
        ]
    },
    {
        name: 'Administration',
        icon: 'icon-equalizer',
        url: '',
        authorities: ['ROLE_ADMIN'],
        children: [
            {
                name: 'User Tracker',
                url: '/admin/jhi-tracker',
                icon: 'icon-user'
            },
            {
                name: 'User Metric',
                url: '/admin/jhi-metrics',
                icon: 'icon-user'
            },
            {
                name: 'Health',
                url: '/admin/jhi-health',
                icon: 'icon-user'
            },
            {
                name: 'Configuration',
                url: '/admin/jhi-configuration',
                icon: 'icon-user'
            },
            {
                name: 'Audits',
                url: '/admin/audits',
                icon: 'icon-user'
            },
            {
                name: 'Logs',
                url: '/admin/logs',
                icon: 'icon-user'
            },
            {
                name: 'Docs',
                url: '/admin/docs',
                icon: 'icon-user'
            }
        ]
    }
];
