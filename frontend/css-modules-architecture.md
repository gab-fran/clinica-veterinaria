# Plano de Arquitetura CSS Modules & Design System

## Visão Geral
Criação e padronização da camada visual do projeto `saep-veterinaria` utilizando **CSS Modules** (`.module.css`) e **CSS Custom Properties** (`var(--...)`).

---

## 1. Variáveis Globais (`src/index.css`)
Serão configuradas as seguintes variáveis no `:root`:

```css
:root {
  --color-text: #303440;
  --color-bg: #F0F1F2;
  --color-secondary: #2E838C;
  --color-primary: #D9814E;
  --color-primary-hover: #D9734E;
}
```

---

## 2. Estrutura de Arquivos Modularizada

- `src/index.css`: Definição de `:root`, reset CSS e estilos globais básicos.
- `src/components/NavBar/NavBar.module.css`: Estilização do cabeçalho de navegação.
- `src/components/Footer/Footer.module.css`: Estilização do rodapé da aplicação.
- `src/components/DynamicForm/DynamicForm.module.css`: Estilização de formulários e inputs.
- `src/components/DynamicList/DynamicList.module.css`: Estilização de tabelas e listagens.
- `src/pages/LoginPage/LoginPage.module.css`: Estilização da página de autenticação.
- `src/pages/Main/Home.module.css`: Estilização da página principal.
- `src/pages/Entities/Create.module.css`: Estilização das páginas de formulário de cadastro.

---

## 3. Diretrizes de Qualidade e Acessibilidade
- Uso exclusivo das variáveis `--color-*` para padronização.
- Nomenclatura das classes em `camelCase` (ex: `.primaryButton`, `.navLink`).
- Estados de foco e hover configurados (`:hover`, `:active`, `:focus-visible`).
- `:global` utilizado apenas quando estritamente necessário.

---

## Próximos Passos
- Revisar este plano.
- Executar a criação e importação dos arquivos `.module.css` nos respectivos componentes React.
