import { Refine } from "@refinedev/core";

export const resources = [
  {
    name: "Dashboard",
    list: "/dashboards",
    icon: "📊", // Ícone para o dashboard
  },
  {
    name: "Monitoramento de Acessos",
    list: "/monacess",
    icon: "📈", // Ícone para o monitoramento de acessos
  },
  {
    name: "Monitoramento de Veículos",
    list: "/monveics",
    icon: "🚗", // Ícone para o monitoramento de veículos
  },
  {
    name: "Monitoramento de Alarmes",
    list: "/monalert",
    icon: "🚨", // Ícone para o monitoramento de alarmes
  },
  {
    name: "Planta Baixa",
    list: "/plantabaixa",
    icon: "📐", // Ícone para a planta baixa
  },
  {
    name: "Cadastros",
    icon: "📁", // Ícone para a seção de Cadastros
  },
  {
    name: "Acesso",
    icon: "🔓", // Ícone para a seção de Acesso
  },

  // Cadastros Submenus
  {
    name: "people",
    list: "/people",
    create: "/people/create",
    createJin: "/people/PeopleCreateJin",
    edit: "/people/edit/:id",
    show: "/people/show/:id",
    icon: "👤",
    meta: { parent: "Cadastros", canDelete: true },
  },
  {
    name: "visitors",
    list: "/visitors",
    create: "/visitors/create",
    edit: "/visitors/edit/:id",
    show: "/visitors/show/:id",
    icon: "👥",
    meta: { parent: "Cadastros", canDelete: true },
  },
  {
    name: "groups",
    list: "/groups",
    create: "/groups/create",
    edit: "/groups/edit/:id",
    show: "/groups/show/:id",
    icon: "👥",
    meta: { parent: "Cadastros", canDelete: true },
  },
  {
    name: "companies",
    list: "/companies",
    create: "/companies/create",
    edit: "/companies/edit/:id",
    show: "/companies/show/:id",
    icon: "🏢",
    meta: { parent: "Cadastros", canDelete: true },
  },
  {
    name: "Tipos de Créditos",
    list: "/credit-types",
    create: "/credit-types/create",
    edit: "/credit-types/edit/:id",
    show: "/credit-types/show/:id",
    icon: "💳",
    meta: { parent: "Cadastros", canDelete: true },
  },
  {
    name: "Gerenciamento de Créditos",
    list: "/credit-management",
    create: "/credit-management/create",
    edit: "/credit-management/edit/:id",
    show: "/credit-management/show/:id",
    icon: "💳",
    meta: { parent: "Cadastros", canDelete: true },
  },
  {
    name: "Cartões Provisórios",
    list: "/temporary-cards",
    create: "/temporary-cards/create",
    edit: "/temporary-cards/edit/:id",
    show: "/temporary-cards/show/:id",
    icon: "💳",
    meta: { parent: "Cadastros", canDelete: true },
  },
  {
    name: "Veículos",
    list: "/vehicles",
    create: "/vehicles/create",
    edit: "/vehicles/edit/:id",
    show: "/vehicles/show/:id",
    icon: "🚗",
    meta: { parent: "Cadastros", canDelete: true },
  },
  {
    name: "Estacionamentos",
    list: "/parkings",
    create: "/parkings/create",
    edit: "/parkings/edit/:id",
    show: "/parkings/show/:id",
    icon: "🚗",
    meta: { parent: "Cadastros", canDelete: true },
  },

  // Acesso Submenus
  {
    name: "areas",
    list: "/areas",
    create: "/areas/create",
    edit: "/areas/edit/:id",
    show: "/areas/show/:id",
    icon: "📍",
    meta: { parent: "Acesso", canDelete: true },
  },
  {
    name: "devices",
    list: "/devices",
    create: "/devices/create",
    edit: "/devices/edit/:id",
    show: "/devices/show/:id",
    icon: "📟",
    meta: { parent: "Acesso", canDelete: true },
  },
  {
    name: "schedules",
    list: "/schedules",
    create: "/schedules/create",
    edit: "/schedules/edit/:id",
    show: "/schedules/show/:id",
    icon: "⏰",
    meta: { parent: "Acesso", canDelete: true },
  },
  {
    name: "Regras de Acesso",
    list: "/access-rules",
    create: "/access-rules/create",
    edit: "/access-rules/edit/:id",
    show: "/access-rules/show/:id",
    icon: "🔑",
    meta: { parent: "Acesso", canDelete: true },
  },
  {
    name: "Regras por Exceção",
    list: "/exception-rules",
    create: "/exception-rules/create",
    edit: "/exception-rules/edit/:id",
    show: "/exception-rules/show/:id",
    icon: "⚠️",
    meta: { parent: "Acesso", canDelete: true },
  },
  {
    name: "Regras de Veículos",
    list: "/vehicle-rules",
    create: "/vehicle-rules/create",
    edit: "/vehicle-rules/edit/:id",
    show: "/vehicle-rules/show/:id",
    icon: "🚗",
    meta: { parent: "Acesso", canDelete: true },
  },
  {
    name: "Inativação Programada",
    list: "/scheduled-deactivation",
    create: "/scheduled-deactivation/create",
    edit: "/scheduled-deactivation/edit/:id",
    show: "/scheduled-deactivation/show/:id",
    icon: "🛑",
    meta: { parent: "Acesso", canDelete: true },
  },
  {
    name: "Notificações",
    list: "/notifications",
    create: "/notifications/create",
    edit: "/notifications/edit/:id",
    show: "/notifications/show/:id",
    icon: "🔔",
    meta: { parent: "Acesso", canDelete: true },
  },
  {
    name: "Relatórios",
    list: "/reports",
    icon: "📊",
    meta: { canDelete: true },
  },
  {
    name: "Configurações",
    list: "/settings",
    icon: "⚙️",
    meta: { canDelete: true },
  },
];
