# Finance Dashboard

Esta é uma aplicação **Next.js** (v15.3.2) e **TypeScript** para visualização de dados financeiros, incluindo login, dashboard com filtros dinâmicos, gráficos e tabela de transações paginada.

---

## 🏁 Início Rápido

### Pré-requisitos

* **Node.js** v18 ou superior
* **npm** (ou **yarn**)

### Instalação

```bash
# Clone este repositório
git clone https://github.com/pablopscheidt/finance-dashboard.git
cd finance-dashboard

# Instale as dependências
npm install
# ou
# yarn install
```

### Scripts úteis

```bash
# Inicia o servidor de desenvolvimento (hot reload):
npm run dev

# Executa lint e validações de TypeScript:
npm run lint

# Executa os testes unitários (Jest + React Testing Library):
npm test

# Cria build de produção:
npm run build

# Inicia o servidor de produção local:
npm start
```

---

## 🛠️ Detalhes do Projeto

* **Framework**: Next.js 15.3.2
* **Linguagem**: TypeScript
* **Estilização**: styled-components + MUI
* **Formulários e Validação**: React Hook Form + Zod (tela de login)
* **Gráficos**: Chart.js via `react-chartjs-2`
* **Tabela de transações**: MUI DataGrid com paginação server-side e cache em memória
* **Cache e ISR**: `export const revalidate` no nível de página + tags no fetch; leitura de arquivo JSON pelo Node em SSR
* **Gerenciamento de estado**: Redux Toolkit (slice de filtros) com persistência via localStorage
* **Autenticação**: fluxo simplificado com middleware e cookie `logged`
* **Responsividade**: Sidebar fixa no desktop; BottomNavbar no mobile; Modal de filtros no mobile


## 📦 Deploy

Este projeto está configurado para deploy automático na **Vercel**:

Podendo ser acessado pelo link https://finance-dashboard-iegmb2e6q-pablopscheidts-projects.vercel.app/login

---

## Observações

- [x]  Página de login e uma Página da Dashboard protegida pelo Login;
- [x]  Filtros globais e dinâmicos e todo o conteúdo da página deve ser atualizado conforme os filtros aplicados;
- [x]  Cards resumindo receitas, despesas, transações pendentes e saldo total;
- [x]  Gráficos de barras empilhadas e Gráficos de linhas para visualização de transações, fica a seu critério quais dados trazer para estas visualizações;
- [x]  Capacidade de filtrar transações por datas, contas, indústrias e estado;
- [x]  Sidebar exclusiva para a página da Dashboard com opções de Logout e Home;
- [x]  Persista a sessão e o valor do filtro sem um banco de dados;
- [x]  Design responsivo e interativo;
- [x]  Utilize Next.js e Typescript;
- [x]  Faça a estilização com styled-components;
- [x]  Inclua no README instruções de instalação do projeto e quaisquer observações relevantes;
- [x]  Utilizar como fonte de dados o conjunto de dados disponibilizado nesse e-mail.
- [x]  Considere fazer o deploy na Vercel ou outra plataforma, fornecendo um link de acesso;
- [x]  Utilização de bibliotecas de componentes (MUI, Chakra, etc) e de construção de gráficos (Highcharts, Chart.js, etc);
- [x]  Testes unitários;
- [x]  Utilização de Cache do Next.js.

---

> Desenvolvido por **Pablo Pscheidt** 