export const resources = [
    {
      name: "blog-posts",
      list: "/blog-posts",
      create: "/blog-posts/create",
      edit: "/blog-posts/edit/:id",
      show: "/blog-posts/show/:id",
      meta: {
        canDelete: true,
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
      },
    },
    {
      name: "users",
      list: "/users",
      create: "/users/create",
      edit: "/users/edit/:id",
      show: "/users/show/:id",
      meta: {
        canDelete: true,
      },
    },
    {
      name: "companies",
      list: "/companies",
      create: "/companies/create",
      edit: "/companies/edit/:id",
      show: "/companies/show/:id",
      meta: {
        canDelete: true,
      },
    },
  ];