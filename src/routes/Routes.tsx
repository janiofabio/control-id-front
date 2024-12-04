import { Authenticated } from "@refinedev/core";
import { ErrorComponent, ThemedLayoutV2 } from "@refinedev/mui";
import { AuthPage } from "../pages/auth";
import {
  CatchAllNavigate,
  NavigateToResource,
} from "@refinedev/react-router-v6";
import { Outlet, Route, Routes } from "react-router-dom";
import { Header, ThemedTitleV2 } from "../contexts/color-mode";

import {
  TenantCreate,
  TenantEdit,
  TenantList,
  TenantShow,
} from "../pages/tenants";
import { TypeCreate, TypeEdit, TypeList, TypeShow } from "../pages/types";
import { UserCreate, UserEdit, UserList, UserShow } from "../pages/people";
import {
  UserProfileCreate,
  UserProfileEdit,
  UserProfileList,
  UserProfileShow,
} from "../pages/user-profiles";
import {
  UserAddressCreate,
  UserAddressEdit,
  UserAddressList,
  UserAddressShow,
} from "../pages/user-addresses";
import {
  CompanyCreate,
  CompanyEdit,
  CompanyShow,
  CompanyList,
} from "../pages/companies";
import {
  CompanyAddressCreate,
  CompanyAddressEdit,
  CompanyAddressList,
  CompanyAddressShow,
} from "../pages/company-addresses";
import {
  BlogPostCreate,
  BlogPostEdit,
  BlogPostList,
  BlogPostShow,
} from "../pages/blog-posts";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "../pages/categories";
import {
  TicketCreate,
  TicketEdit,
  TicketList,
  TicketShow,
} from "../pages/tickets";
import { Landmark } from "../pages/landmark";

export function Router() {
  return (
    <Routes>
      <Route
        element={
          <Authenticated fallback={<CatchAllNavigate to="/login" />}>
            <ThemedLayoutV2
              Title={ThemedTitleV2}
              Header={() => <Header sticky />}
            >
              <Outlet />
            </ThemedLayoutV2>
          </Authenticated>
        }
      >
        <Route index element={<NavigateToResource resource="blog-posts" />} />
        <Route path="/tenants">
          <Route index element={<TenantList />} />
          <Route path="create" element={<TenantCreate />} />
          <Route path="edit/:id" element={<TenantEdit />} />
          <Route path="show/:id" element={<TenantShow />} />
        </Route>
        <Route path="/types">
          <Route index element={<TypeList />} />
          <Route path="create" element={<TypeCreate />} />
          <Route path="edit/:id" element={<TypeEdit />} />
          <Route path="show/:id" element={<TypeShow />} />
        </Route>
        <Route path="/companies">
          <Route index element={<CompanyList />} />
          <Route path="create" element={<CompanyCreate />} />
          <Route path="edit/:id" element={<CompanyEdit />} />
          <Route path="show/:id" element={<CompanyShow />} />
        </Route>
        <Route path="/company-addresses">
          <Route index element={<CompanyAddressList />} />
          <Route path="create" element={<CompanyAddressCreate />} />
          <Route path="edit/:id" element={<CompanyAddressEdit />} />
          <Route path="show/:id" element={<CompanyAddressShow />} />
        </Route>
        <Route path="/users">
          <Route index element={<UserList />} />
          <Route path="create" element={<UserCreate />} />
          <Route path="edit/:id" element={<UserEdit />} />
          <Route path="show/:id" element={<UserShow />} />
        </Route>
        <Route path="/user-profiles">
          <Route index element={<UserProfileList />} />
          <Route path="create" element={<UserProfileCreate />} />
          <Route path="edit/:id" element={<UserProfileEdit />} />
          <Route path="show/:id" element={<UserProfileShow />} />
        </Route>
        <Route path="/user-addresses">
          <Route index element={<UserAddressList />} />
          <Route path="create" element={<UserAddressCreate />} />
          <Route path="edit/:id" element={<UserAddressEdit />} />
          <Route path="show/:id" element={<UserAddressShow />} />
        </Route>
        <Route
          path="/update-password"
          element={<AuthPage type="updatePassword" />}
        />
        <Route path="/tickets">
          <Route index element={<TicketList />} />
          <Route path="create" element={<TicketCreate />} />
          <Route path="edit/:id" element={<TicketEdit />} />
          <Route path="show/:id" element={<TicketShow />} />
        </Route>
        <Route path="/blog-posts">
          <Route index element={<BlogPostList />} />
          <Route path="create" element={<BlogPostCreate />} />
          <Route path="edit/:id" element={<BlogPostEdit />} />
          <Route path="show/:id" element={<BlogPostShow />} />
        </Route>
        <Route path="/categories">
          <Route index element={<CategoryList />} />
          <Route path="create" element={<CategoryCreate />} />
          <Route path="edit/:id" element={<CategoryEdit />} />
          <Route path="show/:id" element={<CategoryShow />} />
        </Route>
        <Route path="/landmark">
          <Route index element={<Landmark />} />
        </Route>
        <Route path="*" element={<ErrorComponent />} />
      </Route>
      <Route
        element={
          <Authenticated fallback={<Outlet />}>
            <NavigateToResource />
          </Authenticated>
        }
      >
        <Route
          path="/login"
          element={
            <AuthPage
              type="login"
              formProps={{
                defaultValues: {
                  email: "user02@mail.com",
                  password: "passWord23",
                },
              }}
            />
          }
        />
        <Route path="/register" element={<AuthPage type="register" />} />
        <Route
          path="/forgot-password"
          element={<AuthPage type="forgotPassword" />}
        />
      </Route>
    </Routes>
  );
}
