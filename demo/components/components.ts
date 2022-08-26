export const routes = [
  {
    name: 'BreadCrumbs',
    path: 'bread-crumbs',
    component: () => import('./BreadCrumbsSection.vue'),
  },
  {
    name: 'Buttons',
    path: 'buttons',
    component: () => import('./ButtonsSection.vue'),
  },
  {
    name: 'Card',
    path: 'card',
    component: () => import('./CardSection.vue'),
  },
  {
    name: 'Code',
    path: 'code',
    component: () => import('./CodeSection.vue'),
  },
  {
    name: 'Divider',
    path: 'divider',
    component: () => import('./DividerSection.vue'),
  },
  {
    name: 'EmptyState',
    path: 'empty-state',
    component: () => import('./EmptyStateSection.vue'),
  },
  {
    name: 'Forms',
    path: 'forms',
    component: () => import('./FormsSection.vue'),
  },
  {
    name: 'IconButtonMenu',
    path: 'icon-button-menu',
    component: () => import('./IconButtonMenuSection.vue'),
  },
  {
    name: 'IconText',
    path: 'icon-text',
    component: () => import('./IconTextSection.vue'),
  },
  {
    name: 'KeyValue',
    path: 'key-value',
    component: () => import('./KeyValueSection.vue'),
  },
  {
    name: 'Links',
    path: 'links',
    component: () => import('./LinksSection.vue'),
  },
  {
    name: 'ListItems',
    path: 'list-items',
    component: () => import('./ListItemsSection.vue'),
  },
  {
    name: 'Modals',
    path: 'modals',
    component: () => import('./ModalsSection.vue'),
  },
  {
    name: 'OverflowMenu',
    path: 'overflow-menu',
    component: () => import('./OverflowMenuSection.vue'),
  },
  {
    name: 'PopOver',
    path: 'pop-over',
    component: () => import('./PopOverSection.vue'),
  },
  {
    name: 'Tables',
    path: 'tables',
    component: () => import('./TablesSection.vue'),
  },
  {
    name: 'Tab',
    path: 'tab',
    component: () => import('./TabSection.vue'),
  },
  {
    name: 'Tags',
    path: 'tags',
    component: () => import('./TagsSection.vue'),
  },
  {
    name: 'Toasts',
    path: 'toasts',
    component: () => import('./ToastsSection.vue'),
  },
  {
    name: 'Typography',
    path: 'typography',
    component: () => import('./TypographySection.vue'),
  },
]