# Tabela de Funcionários Responsiva

Um projeto de front-end moderno que exibe uma lista de funcionários em uma tabela interativa e responsiva, com funcionalidades de busca e scroll infinito.

![Badge de Licença](https://img.shields.io/badge/license-MIT-blue.svg)
![Badge de Status do Build](https://img.shields.io/badge/build-passing-brightgreen.svg)
![Badge do React](https://img.shields.io/badge/React-19-blue?logo=react)
![Badge do TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Badge do Vite](https://img.shields.io/badge/Vite-7-blue?logo=vite)

---

## 📜 Descrição

Este projeto é uma aplicação React construída com Vite e TypeScript que demonstra a criação de uma interface de usuário complexa e performática. A funcionalidade principal é uma tabela de dados que se adapta perfeitamente a diferentes tamanhos de tela: em desktops, exibe uma tabela tradicional, e em dispositivos móveis, transforma-se em uma lista de cartões expansíveis (accordion).

A aplicação consome dados de uma API mock criada com `json-server`, implementando paginação para uma experiência de usuário fluida com scroll infinito e uma busca com debounce para evitar chamadas excessivas à API.

---

## ✨ Funcionalidades

-   **Tabela Responsiva:** Muda de layout de tabela para lista de cartões em telas menores.
-   **Scroll Infinito:** Carrega mais dados automaticamente conforme o usuário rola a página, usando `useInfiniteQuery`.
-   **Busca com Debounce:** Filtra os funcionários por nome com um atraso inteligente para otimizar as requisições à API.
-   **Componentes Reutilizáveis:** Construído com componentes modulares e bem estruturados usando `styled-components`.
-   **Hooks Customizados:** Inclui hooks como `useMediaQuery` e `useDebounce` para lógica reutilizável.
-   **Tipagem Forte:** Desenvolvido com TypeScript para garantir a segurança e a manutenibilidade do código.
-   **API Mock:** Utiliza `json-server` para simular uma API RESTful, facilitando o desenvolvimento e testes sem necessidade de um backend real.
-   **Linting:** Configurado com ESLint para manter a qualidade do código.
-   **Commit Linting:** Utiliza `commitlint` para garantir que as mensagens de commit sigam um padrão específico.

---

## 🚀 Tecnologias Utilizadas

-   **Framework/Lib:** [React](https://reactjs.org/)
-   **Build Tool:** [Vite](https://vitejs.dev/)
-   **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
-   **Estilização:** [Styled Components](https://styled-components.com/)
-   **Gerenciamento de Estado de Servidor:** [TanStack Query (React Query)](https://tanstack.com/query/v4)
-   **API Mock:** [JSON Server](https://github.com/typicode/json-server)
-   **Linting:** [ESLint](https://eslint.org/)

---

## 📂 Estrutura do Projeto

```
/src
|-- /assets         # Ícones, fontes e imagens
|-- /modules        # Componentes de página (ex: HomePage)
|-- /shared         # Componentes e utils compartilhados
|   |-- /components # Componentes reutilizáveis (Table, Input)
|   |-- /hooks      # Hooks customizados (useMediaQuery, useDebounce)
|   |-- /layout     # Componentes de layout (Sidebar)
|   |-- /models     # Interfaces e tipos do TypeScript (ex: Employee)
|   |-- /services   # Funções de comunicação com a API
|   |-- /styles     # Estilos globais e temas
|   |-- /utils      # Funções utilitárias (formatDate, formatPhoneNumber)
|-- App.tsx         # Componente principal da aplicação
`-- main.tsx        # Ponto de entrada da aplicação
```

---

## 🏁 Como Executar

Siga os passos abaixo para configurar e rodar o projeto localmente.

### Pré-requisitos

-   [Node.js](https://nodejs.org/) (versão 18 ou superior)
-   [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

### Instalação

1.  Clone o repositório:
    ```bash
    git clone [https://github.com/miguelwiest/teste-pratico-frontend.git](https://github.com/miguelwiest/teste-pratico-frontend.git)
    ```
2.  Navegue até o diretório do projeto:
    ```bash
    cd teste-pratico-frontend
    ```
3.  Instale as dependências:
    ```bash
    npm install
    ```
    ou, se preferir usar o Yarn:
    ```bash
    yarn install
    ```

### Executando a Aplicação

1.  **Inicie o servidor da API Mock:**
    Em um terminal, rode o seguinte comando para iniciar o `json-server` na porta 3000.
    ```bash
    npm run server
    ```
    ou, se estiver usando o Yarn:
    ```bash
    yarn server
    ```
    
    A API estará disponível em `http://localhost:3000`.

2.  **Inicie a aplicação React:**
    Em outro terminal, rode o comando de desenvolvimento.
    ```bash
    npm run dev
    ```
    ou, se estiver usando o Yarn:
    ```bash
    yarn dev
    ```
    A aplicação estará disponível em `http://localhost:5173` (ou outra porta indicada pelo Vite).

---

## ⚙️ Scripts Disponíveis

-   `npm run dev`: Inicia o servidor de desenvolvimento do Vite.
-   `npm run build`: Compila a aplicação para produção.
-   `npm run lint`: Executa o ESLint para analisar o código.
-   `npm run server`: Inicia o `json-server` para a API mock.

---

## 🔑 Componentes Principais

### `<ResponsiveTable />`

Um componente de tabela genérico e responsivo.

-   **Props:**
    -   `data: T[]`: Array de dados a serem exibidos.
    -   `columns: Column<T>[]`: Configuração das colunas.
    -   `fetchNextPage: () => void`: Função para buscar a próxima página de dados.
    -   `hasNextPage: boolean`: Indica se há mais páginas para carregar.
    -   `isFetchingNextPage: boolean`: Indica se a próxima página está sendo carregada.

### `<Input />`

Um campo de input estilizado que pode incluir um ícone.

-   **Props:**
    -   Aceita todas as props padrão de um `input` HTML.
    -   `icon?: React.ReactNode`: Um ícone para ser exibido dentro do campo.

### `useMediaQuery(query)`

Hook que retorna `true` se a media query fornecida corresponder ao estado atual da janela.

### `useDebounce(value, delay)`

Hook que atrasa a atualização de um valor, útil para otimizar buscas ou outras operações.

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.
