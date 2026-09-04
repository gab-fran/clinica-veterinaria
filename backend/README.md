# ⚙️ Backend — VetStock (API RESTful Spring Boot)

Esta é a API RESTful de serviços do **VetStock**, desenvolvida para centralizar a regra de negócios, autenticação de usuários, auditoria de movimentações de almoxarifado, controle de estoque mínimo e gerenciamento de insumos médicos/hospitalares e de pet shop.

---

## 🎯 Visão Geral & Arquitetura de Software

A API foi projetada segundo os princípios de **Clean Architecture** e **Layered Architecture (Arquitetura em Camadas)**, garantindo forte separação de responsabilidades, facilidade de manutenção e extensibilidade.

```text
[HTTP Client / REST] 
         │
         ▼
[Controller Layer]  ──────> Processa requisições HTTP, valida DTOs de entrada e retorna Status HTTP adequados.
         │
         ▼
[Service Layer]     ──────> Executa as regras de negócio (validação de estoque mínimo, criptografia de senhas, controle de permissões).
         │
         ▼
[Repository Layer]  ──────> Abstração do Spring Data JPA para comunicação com a base de dados PostgreSQL.
         │
         ▼
[PostgreSQL Database]
```

### **Stack Tecnológica**
- **Linguagem**: Java 21 (LTS)
- **Framework Principal**: Spring Boot 4.0.6
- **Módulos Spring**:
  - `spring-boot-starter-webmvc` (Controllers REST)
  - `spring-boot-starter-data-jpa` (Persistência com Hibernate)
  - `spring-boot-starter-security` (Autenticação e Autorização)
  - `spring-boot-starter-validation` (Validação de DTOs via Bean Validation)
  - `spring-boot-starter-flyway` (Versionamento de banco de dados)
- **Segurança & JWT**: Java JWT (`com.auth0:java-jwt:4.4.0`) + BCrypt Password Encoder
- **Banco de Dados**: PostgreSQL 18
- **Migrações**: Flyway (`flyway-core`, `flyway-database-postgresql`)
- **Mapeamento de Objetos**: MapStruct 1.6.3 (Conversão de Entidade <-> DTO sem overhead de reflexão)
- **Documentação de API**: Springdoc OpenAPI / Swagger UI 2.8.8
- **Utilitários**: Lombok, DevTools, Spotless (Formatting)

---

## 📁 Estrutura de Pastas

```text
backend/
├── src/
│   ├── main/
│   │   ├── java/br/senai/saepveterinaria/
│   │   │   ├── config/             # Configurações de CORS e mensagens de inicialização
│   │   │   ├── controller/         # Endpoints RESTful (Controllers HTTP)
│   │   │   │   ├── AuthController.java
│   │   │   │   ├── HomeController.java
│   │   │   │   ├── MovimentacaoController.java
│   │   │   │   ├── ProdutoController.java
│   │   │   │   └── UsuarioController.java
│   │   │   ├── dto/                # Data Transfer Objects (DTOs de entrada e saída)
│   │   │   │   ├── auth/           # DTOs de Login e Resposta de Token
│   │   │   │   ├── movimentacao/   # DTOs de Movimentação de Estoque
│   │   │   │   ├── produto/        # DTOs de Inclusão, Edição e Resumo de Produtos
│   │   │   │   └── usuario/        # DTOs de Usuário e Alteração de Senha
│   │   │   ├── entity/             # Entidades JPA de Banco de Dados (`Usuario`, `Produto`, `MovimentacaoEstoque`)
│   │   │   ├── enums/              # Enums de Domínio (`RoleUsuario`, `TipoProduto`, `UnidadeMedida`, `TipoMovimentacao`)
│   │   │   ├── exception/          # Handler global de exceções (`@ControllerAdvice`) e exceções customizadas
│   │   │   ├── mapper/             # Interfaces MapStruct para conversão de DTOs
│   │   │   ├── repository/         # Interfaces Spring Data JPA Repositories
│   │   │   ├── security/           # Filtros de Autenticação JWT, Token Provider e SecurityFilterChain
│   │   │   ├── service/            # Regras de Negócio do Sistema (Auth, Produto, Movimentação, Usuário)
│   │   │   └── SaepVeterinariaApplication.java # Classe principal de inicialização Spring Boot
│   │   └── resources/
│   │       ├── db/migration/       # Scripts SQL versionados do Flyway
│   │       │   ├── V1__create_initial_schema.sql  # DDL - Estrutura de Tabelas
│   │       │   └── V2__insert_initial_schema.sql  # DML - Dados Iniciais / Seeds
│   │       ├── application.properties             # Configuração base Spring
│   │       ├── application-dev.properties         # Perfil de Desenvolvimento Local
│   │       └── application-prod.properties        # Perfil de Produção
├── .env.example                    # Modelo de Variáveis de Ambiente
├── Dockerfile                      # Instruções de build da imagem Docker do backend
├── mvnw / mvnw.cmd                 # Maven Wrapper scripts
└── pom.xml                         # Gerenciador de Dependências Maven
```

---

## 🔑 Variáveis de Ambiente

Crie um arquivo `.env` no diretório `backend/` utilizando o modelo fornecido no `.env.example`:

| Variável | Descrição | Exemplo / Valor Padrão |
|---|---|---|
| `SPRING_PROFILES_ACTIVE` | Perfil ativo do Spring Boot (`dev`, `prod`) | `dev` |
| `PORT` | Porta HTTP na qual a API irá rodar | `8080` |
| `DB_URL` | String de conexão JDBC com o PostgreSQL | `jdbc:postgresql://localhost:5432/saep_db` |
| `DB_USERNAME` | Usuário do banco de dados PostgreSQL | `postgres` |
| `DB_PASSWORD` | Senha do banco de dados PostgreSQL | `postgres` |
| `POSTGRES_DB` | Nome do Banco de Dados no Docker | `saep_db` |
| `POSTGRES_USER` | Usuário de criação da imagem Postgres | `postgres` |
| `POSTGRES_PASSWORD` | Senha da imagem Postgres no Docker | `postgres` |
| `PALAVRA_SECRETA` | Segredo para assinatura de Tokens JWT | `replace_with_a_strong_secret_key` |
| `JWT_EXPIRATION_TIME` | Tempo de expiração do Token JWT (em segundos) | `86400` (24 horas) |

---

## 🗄️ Banco de Dados & Migrações (Flyway)

O gerenciamento do schema e a carga inicial de dados são efetuados automaticamente pelo **Flyway Migration** assim que a aplicação Spring Boot é inicializada.

### Versionamento de Schema (`db/migration`):
- `V1__create_initial_schema.sql`:
  - Cria as tabelas `tb_usuario`, `tb_produto` e `tb_movimentacao_estoque` com chaves primárias, chaves estrangeiras e constraints de integridade.
- `V2__insert_initial_schema.sql`:
  - Popula o banco com os perfis de acesso (`ADMINISTRADOR`, `FUNCIONARIO`), usuários padrão com senhas criptografadas em BCrypt e produtos pré-cadastrados para teste imediato.

---

## 🛣️ Tabela de Endpoints da API

Todas as rotas (com exceção das rotas públicas de `/auth/*` e documentação Swagger) requerem o envio do Token JWT no cabeçalho HTTP:
`Authorization: Bearer <seu_token_jwt>`

### **Autenticação & Status (`/auth`, `/`)**
| Método | Rota | Descrição | Requer Autenticação? | Permissão |
|---|---|---|---|---|
| `GET` | `/` | Health check da API | ❌ Não | Livre |
| `POST` | `/auth/login` | Autenticação do usuário e geração de Token JWT | ❌ Não | Livre |
| `POST` | `/auth/register` | Cadastro inicial de usuário | ❌ Não | Livre |

### **Gestão de Produtos (`/produtos`)**
| Método | Rota | Descrição | Requer Autenticação? | Permissão |
|---|---|---|---|---|
| `GET` | `/produtos` | Listagem paginada de produtos | ✅ Sim | Autenticado |
| `GET` | `/produtos/{id}` | Busca produto detalhado por ID | ✅ Sim | Autenticado |
| `POST` | `/produtos` | Cadastro de novo produto no estoque | ✅ Sim | Autenticado |
| `PUT` | `/produtos/{id}` | Atualização dos dados do produto | ✅ Sim | Autenticado |
| `DELETE` | `/produtos/{id}` | Remoção de produto do sistema | ✅ Sim | Autenticado |

### **Gestão de Movimentações & Almoxarifado (`/movimentacoes`)**
| Método | Rota | Descrição | Requer Autenticação? | Permissão |
|---|---|---|---|---|
| `GET` | `/movimentacoes` | Listagem paginada do histórico de movimentações | ✅ Sim | Autenticado |
| `GET` | `/movimentacoes/{id}` | Detalhes de uma movimentação específica | ✅ Sim | Autenticado |
| `POST` | `/movimentacoes` | Registro de entrada/saída (Valida Estoque Mínimo) | ✅ Sim | Autenticado |
| `PUT` | `/movimentacoes/{id}` | Atualização de dados da movimentação | ✅ Sim | Autenticado |
| `DELETE` | `/movimentacoes/{id}` | Exclusão do registro de movimentação | ✅ Sim | Autenticado |

### **Gestão de Usuários (`/usuarios`)**
| Método | Rota | Descrição | Requer Autenticação? | Permissão |
|---|---|---|---|---|
| `GET` | `/usuarios` | Listagem paginada de usuários | ✅ Sim | Autenticado |
| `GET` | `/usuarios/{id}` | Busca usuário por ID | ✅ Sim | Autenticado |
| `GET` | `/usuarios/por-email/{email}` | Busca usuário por endereço de e-mail | ✅ Sim | Autenticado |
| `POST` | `/usuarios` | Cadastro de novo usuário | ✅ Sim | `ADMINISTRADOR` |
| `PUT` | `/usuarios/{id}` | Atualiza dados cadastrais do usuário | ✅ Sim | Autenticado |
| `PUT` | `/usuarios/{id}/senha` | Altera a senha do usuário | ✅ Sim | Autenticado |
| `DELETE` | `/usuarios/{id}` | Remove usuário por ID | ✅ Sim | Autenticado |

### **Documentação Swagger / OpenAPI**
- **Interface Swagger UI**: `http://localhost:8080/swagger-ui/index.html`
- **OpenAPI JSON Spec**: `http://localhost:8080/v3/api-docs`

---

## 🚀 Instalação e Execução Local

### 1. Pré-requisitos
- **Java 21 JDK** ou superior configurado no `JAVA_HOME`.
- **PostgreSQL 18** em execução ou um container de banco ativo.

### 2. Configurar o Banco de Dados
Certifique-se de criar a base de dados no PostgreSQL:
```sql
CREATE DATABASE saep_db;
```

### 3. Executar a Aplicação
Navegue até o diretório `backend` e utilize o wrapper do Maven:

```bash
# No Linux / macOS
./mvnw clean spring-boot:run

# No Windows (PowerShell / CMD)
.\mvnw.cmd clean spring-boot:run
```

O Spring Boot compilará os arquivos, executará as migrações do Flyway e iniciará o servidor HTTP na porta `8080`.

---
<div align="center">
  <sub>Documentação da API Backend do projeto VetStock.</sub>
</div>
