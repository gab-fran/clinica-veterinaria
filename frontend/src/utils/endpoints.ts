export const endpoints = {
  home: '/',
  auth: {
    login: '/auth/login',
    register: '/auth/register',
  },
  usuarios: {
    base: '/usuarios',
    byId: (id: number) => `/usuarios/${id}`,
    byEmail: (email: string) => `/usuarios/por-email/${encodeURIComponent(email)}`,
    senha: (id: number) => `/usuarios/${id}/senha`,
  },
  produtos: {
    base: '/produtos',
    byId: (id: number) => `/produtos/${id}`,
  },
  movimentacoes: {
    base: '/movimentacoes',
    byId: (id: number) => `/movimentacoes/${id}`,
  },
} as const;
