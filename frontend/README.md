# 💻 Frontend — VetStock (Aplicação Web React)

Esta é a aplicação cliente do **VetStock**, uma plataforma Single Page Application (SPA) desenvolvida para a gestão de estoque, controle de almoxarifado veterinário e rastreabilidade de insumos em clínicas veterinárias e pet shops.

---

## 🎯 Visão Geral & Stack Técnica

O frontend foi projetado priorizando altíssima usabilidade, acessibilidade, modularidade de componentes e tipagem estática rigorosa para garantir a confiabilidade dos dados inseridos pelos operadores de almoxarifado.

### **Stack Tecnológica**
- **Biblioteca Principal**: [React 19](https://react.dev/)
- **Linguagem**: [TypeScript 5](https://www.typescriptlang.org/)
- **Ferramenta de Build & HMR**: [Vite 6](https://vitejs.dev/)
- **Biblioteca de Componentes UI**: [PrimeReact 10](https://primereact.org/) + [PrimeIcons](https://primereact.org/icons/)
- **Gerenciamento de Formulários & Validação**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) + `@hookform/resolvers`
- **Roteamento**: [React Router DOM 7](https://reactrouter.com/)
- **Arquitetura de Estilização**: CSS Modules (`*.module.css`) para escopamento local e prevenção de colisões de classe CSS.

---

## 📁 Estrutura de Pastas

```text
frontend/
├── public/                     # Arquivos estáticos da aplicação
├── src/
│   ├── assets/                 # Imagens, logotipos e ícones
│   ├── components/             # Componentes genéricos e reutilizáveis
│   │   ├── DeleteConfirmModal/ # Modal genérico de confirmação de exclusão
│   │   ├── DynamicForm/        # Gerador dinâmico de formulários baseados em schemas
│   │   ├── DynamicList/        # Tabela e listagem paginada com ações rápidas
│   │   ├── Footer/             # Rodapé padrão do sistema
│   │   ├── NavBar/             # Barra de navegação superior e indicador de usuário
│   │   └── ProtectedRoute/     # Guardião de rotas autenticadas (JWT Auth Shield)
│   ├── enums/                  # Enums TypeScript (TipoProduto, UnidadeMedida, etc.)
│   ├── pages/                  # Visualizações e telas da aplicação
│   │   ├── Entities/           # Módulos de Entidades (CRUDs do sistema)
│   │   │   ├── Movimentacao/   # Telas de Inclusão, Detalhes e Listagem de Movimentações
│   │   │   ├── Produto/        # Telas de Inclusão, Edição, Detalhes e Tabela de Produtos
│   │   │   └── Usuario/        # Gestão de Usuários e Perfis de Acesso
│   │   ├── LoginPage/          # Tela de Autenticação / Login
│   │   └── Main/               # Dashboard Principal / Home
│   ├── schemas/                # Schemas de validação Zod para os formulários
│   ├── services/               # Camada de integração HTTP com a API REST backend
│   │   ├── apiClient.ts        # Client Fetch/Axios customizado com intercepção de JWT
│   │   ├── apiConfig.ts        # Configuração base de URLs e gerenciamento de LocalStorage
│   │   ├── authService.ts      # Serviços de Login e Registro
│   │   ├── produtoService.ts   # Chamadas aos endpoints de Produtos
│   │   ├── movimentacaoService.ts # Chamadas aos endpoints de Estoque
│   │   └── usuarioService.ts   # Chamadas aos endpoints de Usuários
│   ├── types/                  # Interfaces e Types TypeScript de DTOs e Respostas
│   ├── utils/                  # Funções auxiliares (Formatadores de data/moeda, Ordenação)
│   ├── App.tsx                 # Configuração de Rotas e Provedores do React Router
│   ├── index.css               # Estilos globais e temas do PrimeReact
│   └── main.tsx                # Ponto de entrada da aplicação React
├── .env.example                # Modelo de variáveis de ambiente
├── package.json                # Dependências e scripts do projeto
├── tsconfig.json               # Configuração do compilador TypeScript
└── vite.config.ts              # Configuração do bundling e servidor Vite
```

---

## 🔑 Variáveis de Ambiente

Para rodar a aplicação frontend, crie um arquivo `.env` na raiz da pasta `frontend/` com base no arquivo `.env.example`:

| Chave | Descrição | Valor Padrão (Dev) |
|---|---|---|
| `VITE_API_URL` | URL base da API Spring Boot backend | `http://localhost:8080` |

---

## ⚙️ Instalação e Execução

### 1. Instalação de Dependências
Certifique-se de ter o Node.js (versão 20 ou superior) instalado. No terminal, execute:

```bash
# Navegue até a pasta do frontend
cd frontend

# Instale as dependências via npm
npm install

# (Ou via yarn / pnpm)
# yarn install
# pnpm install
```

### 2. Executando em Modo Desenvolvimento
Para iniciar o servidor de desenvolvimento com HMR (Hot Module Replacement):

```bash
npm run dev
```
A aplicação abrirá no endereço local padrão: `http://localhost:5173`.

### 3. Build para Produção & Linting
Para verificar a qualidade do código com ESLint e gerar a build otimizada de produção:

```bash
# Executar a verificação do linter
npm run lint

# Compilar a aplicação para distribuição
npm run build

# Visualizar a build gerada localmente
npm run preview
```

---

## 🎨 Decisões de Design & UX (User Experience)

1. **Componentização Genérica (`DynamicForm` e `DynamicList`)**:
   - Para evitar duplicação de código nos CRUDs de Produtos, Usuários e Movimentações, foram criados componentes utilitários genéricos que renderizam formulários e tabelas paginadas a partir de dados descritivos de schema.

2. **Isolamento de Estilos via CSS Modules**:
   - Optou-se pela arquitetura de **CSS Modules** para manter a flexibilidade do Vanilla CSS sem o risco de vazamento de estilos entre páginas (`Create.module.css`, `List.module.css`, `Details.module.css`).

3. **Validação Declarativa e Instantânea de Formulários**:
   - Integração do **Zod** com **React Hook Form**. Validações de campos obrigatórios, faixas numéricas de dosagem e formato de e-mail ocorrem no client-side antes mesmo de realizar a requisição HTTP.

4. **Alertas Visuais de Estoque Mínimo**:
   - Destaque em cores estratégicas (Badges vermelhos/amarelos do PrimeReact) quando a quantidade de um produto atinge o nível mínimo cadastrado, facilitando a identificação imediata pelos funcionários da clínica.

5. **Proteção de Rotas Baseada em Tokens (Guardião JWT)**:
   - O componente `ProtectedRoute` intercepta o acesso a rotas privadas, verificando a presença e validade do token JWT armazenado no `localStorage`, redirecionando usuários não autenticados para a tela de login.

---
<div align="center">
  <sub>Documentação da camada Frontend do projeto VetStock.</sub>
</div>
