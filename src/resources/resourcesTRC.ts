export const resources = [
  { name: "platform-admin" },
  {
    name: "company-management",
  },
  {
    name: "user-management",
  },
  {
    name: "profile",
    meta: {
      parent: "user-management",
    },
  },
  {
    name: "Suport",
  },

  {
    name: "Blog",
    meta: {
      label: "Blog",
    },
  },
  {
    name: "types",
    list: "/types",
    create: "/types/create",
    edit: "/types/edit/:id",
    show: "/types/show/:id",
    meta: {
      canDelete: false,
      dataProviderName: "core",
      parent: "platform-admin",
    },
  },
  {
    name: "tenants",
    list: "/tenants",
    create: "/tenants/create",
    edit: "/tenants/edit/:id",
    show: "/tenants/show/:id",
    meta: {
      canDelete: false,
      dataProviderName: "core",
      parent: "platform-admin",
    },
  },
  {
    name: "companies",
    list: "/companies",
    create: "/companies/create",
    edit: "/companies/edit/:id",
    show: "/companies/show/:id",
    meta: {
      canDelete: false,
      dataProviderName: "core",
      parent: "company-management",
    },
  },
  {
    name: "company-addresses",
    list: "/company-addresses",
    create: "/company-addresses/create",
    edit: "/company-addresses/edit/:id",
    show: "/company-addresses/show/:id",
    meta: {
      canDelete: false,
      dataProviderName: "core",
      parent: "company-management",
    },
  },
  {
    name: "users",
    list: "/users",
    create: "/users/create",
    edit: "/users/edit/:id",
    show: "/users/show/:id",
    meta: {
      canDelete: false,
      dataProviderName: "default",
      parent: "user-management",
      populate: {
        role: {
          fields: ["id", "name"],
        },
      },
    },
  },
  {
    name: "user-profiles",
    list: "/user-profiles",
    create: "/user-profiles/create",
    edit: "/user-profiles/edit/:id",
    show: "/user-profiles/show/:id",
    meta: {
      canDelete: false,
      dataProviderName: "core",
      parent: "profile",
    },
  },
  {
    name: "user-addresses",
    list: "/user-addresses",
    create: "/user-addresses/create",
    edit: "/user-addresses/edit/:id",
    show: "/user-addresses/show/:id",
    meta: {
      canDelete: false,
      dataProviderName: "core",
      parent: "profile",
    },
  },
  {
    name: "update-password",
    list: "/update-password",
    meta: {
      canDelete: false,
      dataProviderName: "default",
      parent: "profile",
    },
  },
  {
    name: "tickets",
    list: "/tickets",
    create: "/tickets/create",
    edit: "/tickets/edit/:id",
    show: "/tickets/show/:id",
    meta: {
      canDelete: false,
      dataProviderName: "ticket",
      parent: "suport",
    },
  },
  {
    name: "blog-posts",
    list: "/blog-posts",
    create: "/blog-posts/create",
    edit: "/blog-posts/edit/:id",
    show: "/blog-posts/show/:id",
    canDelete: false,
    meta: {
      canDelete: false,
      canCreate: false,
      canShow: true,
      canEdit: false,
      dataProviderName: "blog",
      parent: "Blog",
    },
  },
  {
    name: "categories",
    list: "/categories",
    create: "/categories/create",
    edit: "/categories/edit/:id",
    show: "/categories/show/:id",
    meta: {
      canDelete: true,
      dataProviderName: "blog",
      parent: "Blog",
    },
  },
  {
    name: "faceID",
    list: "/landmark",

    meta: {},
  },
];
