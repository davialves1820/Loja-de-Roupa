# 🛍️ Loja de Roupas — E-commerce Completo

Plataforma completa de loja virtual para venda de roupas, desenvolvida com **React + TypeScript** no frontend e **Node.js + Express + MongoDB** no backend.  
O projeto foi criado com foco em **aprendizado**, **organização de código** e **integração entre front e back** em um ambiente real de e-commerce.

---

## 📑 Índice

- [Visão Geral](#-visão-geral)
- [Principais Funcionalidades](#-principais-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Instalação e Execução](#-instalação-e-execução)
- [Endpoints da API](#-endpoints-da-api)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Futuras Melhorias](#-futuras-melhorias)
- [Licença](#-licença)

---

## 💡 Visão Geral

O sistema **Loja de Roupas** é um e-commerce funcional que permite:
- Exibição de produtos (camisetas, calças, etc.);
- Carrinho de compras dinâmico;
- Pagamento via **Pix** (simulado ou integrado);
- Área de **perfil do usuário**;
- Comunicação com o backend via **API REST**.

O objetivo do projeto é demonstrar as boas práticas de desenvolvimento full stack, integrando React no cliente e Node.js com MongoDB no servidor.

---

## ⚙️ Principais Funcionalidades

### 🛒 Frontend (React + TypeScript)
- Página inicial com exibição de roupas disponíveis;
- Página de detalhes do produto com fotos, tamanhos e preço;
- Carrinho de compras com controle de quantidade (incrementar, remover, limpar);
- Sistema de autenticação com armazenamento local (usuário logado em `localStorage`);
- Tela de pagamento via Pix;
- Página de perfil do usuário;
- Notificações visuais com Toaster/Sonner;
- Roteamento com React Router DOM.

### 🧩 Backend (Node.js + Express + MongoDB)
- CRUD completo de produtos (`clothes`);
- Controle de usuários (cadastro, login, autenticação);
- Registro de pedidos e integração com pagamentos Pix;
- Conexão com banco de dados MongoDB;
- Middleware de autenticação e validação de dados;
- Separação clara de camadas (`controllers`, `routes`, `models`, `services`).

---

## 🧰 Tecnologias Utilizadas

### 🔹 Frontend
- **React** — biblioteca principal para a interface;
- **TypeScript** — tipagem estática e segurança de código;
- **Vite** — build rápido e eficiente;
- **React Router DOM** — navegação entre páginas;
- **React Query (TanStack)** — gerenciamento de requisições e cache;
- **Tailwind CSS** — estilização moderna e responsiva;
- **Lucide React** — ícones SVG modernos;
- **Shadcn/UI** — componentes prontos e estilizados;
- **Sonner / Toaster** — feedbacks e alertas para o usuário;
- **Context API** — gerenciamento global de estado (ex: carrinho).

### 🔹 Backend
- **Node.js** — ambiente de execução JavaScript;
- **Express.js** — framework para criação de rotas e middlewares;
- **MongoDB** — banco de dados NoSQL para persistência de dados;
- **Mongoose** — ODM para modelagem de dados no MongoDB;
- **Dotenv** — gerenciamento de variáveis de ambiente;
- **Cors / Body-parser** — suporte a requisições HTTP e segurança;
- **Nodemon** — atualização automática em ambiente de desenvolvimento.

---

## 📂 Estrutura do Projeto

```
Loja-de-Roupa/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── database/
│   │   └── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── services/
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── clothesData.json
└── README.md
```

---

## 🚀 Instalação e Execução

### 1. Clone o repositório
```bash
git clone https://github.com/davialves1820/Loja-de-Roupa.git
cd Loja-de-Roupa
```

### 2. Configurar o Backend
```bash
cd backend
npm install
cp .env.example .env
npm start
```

O servidor será iniciado em:  
👉 `http://localhost:5000`

### 3. Configurar o Frontend
```bash
cd ../frontend
npm install
npm run dev
```

O frontend rodará em:  
👉 `http://localhost:8000`

---

## 🌐 Endpoints da API

| Método | Rota | Descrição |
|--------|-------|------------|
| `GET` | `/api/clothes` | Lista todas as roupas |
| `GET` | `/api/clothes/:id` | Retorna uma roupa específica |
| `POST` | `/api/clothes` | Adiciona uma nova roupa |
| `PUT` | `/api/clothes/:id` | Atualiza informações da roupa |
| `DELETE` | `/api/clothes/:id` | Remove uma roupa |
| `POST` | `/api/orders` | Cria um novo pedido |
| `POST` | `/api/auth/login` | Login do usuário |
| `POST` | `/api/auth/register` | Registro de novo usuário |

---

## 🔐 Variáveis de Ambiente

Arquivo `.env` no diretório `backend`:

```
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/
PORT=5000
JWT_SECRET=sua_chave_secreta
```

---

## 🚧 Futuras Melhorias

- [ ] Sistema completo de autenticação JWT com refresh token  
- [ ] Dashboard para administração de produtos  
- [ ] Upload de imagens de produtos no Cloudinary  
- [ ] Integração real com API de pagamentos Pix  
- [ ] Melhor responsividade mobile  

---

## 🌐 Projeto hospedado
[loja-de-roupa-six.vercel.app](https://loja-de-roupa-six.vercel.app)

---

## 📜 Licença

Este projeto está licenciado sob a **MIT License** — veja o arquivo [LICENSE](LICENSE) para mais detalhes.
