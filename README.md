## 🎯 Desafio Final — Rick and Morty App

### Descrição

Construa um app utilizando a **Rick and Morty API** pública (`https://rickandmortyapi.com`).

> Nenhuma chave de API é necessária — a API é totalmente aberta e gratuita.

O app deve ter **quatro páginas**:

**Página 1 — Personagens**
- Ao carregar a página, exibir automaticamente todos os personagens
- Campo de busca por nome + botão pesquisar
- Filtro por status: Todos / Vivo / Morto / Desconhecido
- Cards com foto, nome, espécie e status (com indicador colorido)
- Botão de favoritar em cada card
- Paginação com navegação entre páginas

**Página 2 — Episódios**
- Ao carregar, exibir todos os episódios
- Cards com código do episódio (ex: S01E01), nome, data de exibição e número de personagens
- Filtro por temporada
- Paginação

**Página 3 — Localizações**
- Ao carregar, exibir todas as localizações
- Cards com nome, tipo e dimensão
- Filtro por tipo
- Paginação

**Página 4 — Favoritos**
- Listar todos os personagens favoritados
- Botão para remover dos favoritos
- Contador de favoritos visível no menu de navegação
- Mensagem "Você ainda não tem favoritos" quando lista estiver vazia

### Requisitos técnicos

Para atingir a nota máxima, o projeto deve utilizar:

- [ ] `useState` — busca, filtros, paginação, loading, lista de favoritos
- [ ] `useEffect` — buscar dados ao carregar a página e ao mudar filtros/página
- [ ] `useContext` — compartilhar favoritos entre todas as páginas
- [ ] `useRef` — foco automático no campo de busca ao carregar a página de personagens
- [ ] **React Router** — navegação entre as quatro páginas
- [ ] **Componente** `PersonagemCard` — recebendo dados via props
- [ ] **Consumo de API** — fetch com async/await na Rick and Morty API
- [ ] **Paginação** — implementada nas três páginas de listagem

### API de referência

```
Personagens:  https://rickandmortyapi.com/api/character?page=1&name=rick&status=alive
Episódios:    https://rickandmortyapi.com/api/episode?page=1
Localizações: https://rickandmortyapi.com/api/location?page=1
```

Documentação completa: [rickandmortyapi.com/documentation](https://rickandmortyapi.com/documentation)

### Prazo

**15 dias** a partir da data da última aula.

---

## 🎨 Layout de referência

Acesse o layout base do projeto para ver o comportamento esperado:

👉 **[Visualizar o app de referência](https://rick-and-morty-app-rho-rust.vercel.app/personagens)**

> Use como referência visual — não é obrigatório seguir o design à risca. Sinta-se livre para personalizar cores, fontes e organização dos elementos.

---

## 🚀 Criando o projeto com Vite

O projeto deve ser criado com **Vite** — a ferramenta recomendada para aplicações React modernas.

### 1. Criar o projeto

```bash
npm create vite@latest rick-and-morty-app -- --template react
```

### 2. Entrar na pasta e instalar as dependências

```bash
cd rick-and-morty-app
npm install
```

### 3. Instalar o React Router

```bash
npm install react-router-dom
```

### 4. Rodar o projeto localmente

```bash
npm run dev
```

O projeto abre automaticamente em `http://localhost:5173`

### 5. Estrutura de pastas sugerida

```
rick-and-morty-app/
├── src/
│   ├── components/
│   │   └── PersonagemCard.jsx
│   ├── context/
│   │   └── FavoritosContext.jsx
│   ├── pages/
│   │   ├── Personagens.jsx
│   │   ├── Episodios.jsx
│   │   ├── Localizacoes.jsx
│   │   └── Favoritos.jsx
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
└── index.html
```

### Comandos úteis

| Comando | O que faz |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a versão de produção na pasta `dist/` |
| `npm run preview` | Visualiza a versão de produção localmente |

---

## 🎨 Configurando o Bootstrap (opcional)

O Bootstrap pode ser integrado ao projeto Vite + React para acelerar o layout com componentes prontos (grid, botões, cards, navbar, etc.).

Documentação oficial: [Bootstrap and Vite](https://getbootstrap.com/docs/5.3/getting-started/vite/)

### 1. Instalar as dependências

```bash
npm install bootstrap @popperjs/core
npm install --save-dev sass
```

> O `@popperjs/core` é necessário para dropdowns, popovers e tooltips. Se você não for usar esses componentes, pode omitir essa dependência.

### 2. Criar o arquivo de estilos

Crie o arquivo `src/scss/styles.scss` com o import do Bootstrap:

```scss
@import "bootstrap/scss/bootstrap";
```

### 3. Importar no ponto de entrada da aplicação

Em `src/main.jsx`, importe o CSS e, se precisar dos plugins JavaScript do Bootstrap (modal, dropdown, etc.), importe o JS também:

```js
import './scss/styles.scss'
import * as bootstrap from 'bootstrap'
```

> Para reduzir o tamanho do bundle, você pode importar apenas os plugins que for usar — veja a [documentação de JavaScript do Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/javascript/).

### 4. Usar classes do Bootstrap nos componentes

```jsx
<div className="container py-4">
  <h1 className="display-4">Rick and Morty App</h1>
  <button className="btn btn-primary">Pesquisar</button>
</div>
```

---

## 🌬️ Configurando o Tailwind CSS (opcional)

O Tailwind CSS oferece classes utilitárias para estilizar a interface diretamente no JSX, sem precisar escrever CSS separado para cada elemento.

Documentação oficial: [Installing Tailwind CSS with Vite](https://tailwindcss.com/docs/installation/using-vite)

### 1. Instalar as dependências

```bash
npm install tailwindcss @tailwindcss/vite
```

### 2. Configurar o plugin no Vite

Edite o arquivo `vite.config.js` na raiz do projeto:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

### 3. Importar o Tailwind no CSS

No arquivo `src/index.css` (ou crie um `src/style.css`), adicione:

```css
@import "tailwindcss";
```

Certifique-se de que esse arquivo está importado em `src/main.jsx`:

```js
import './index.css'
```

### 4. Usar classes do Tailwind nos componentes

```jsx
<div className="container mx-auto py-8 px-4">
  <h1 className="text-3xl font-bold text-green-500">Rick and Morty App</h1>
  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
    Pesquisar
  </button>
</div>
```

> Você pode usar **Bootstrap** ou **Tailwind CSS** — escolha um dos dois para manter o projeto organizado. Nenhum dos dois é obrigatório para o desafio.

---

## 📊 Critérios de avaliação

A nota final é de **0 a 10** e é composta pelos critérios abaixo.

### Funcionalidade (8 pontos)

| Critério | Pontos |
|---|---|
| Personagens carregando automaticamente com busca e filtro funcionando | 1,5 pt |
| Episódios e Localizações carregando com filtros | 1,5 pt |
| Cards exibindo os dados corretamente em todas as páginas | 1,0 pt |
| Loading e mensagens de erro implementados | 0,5 pt |
| Favoritar e desfavoritar funcionando | 1,0 pt |
| Contador de favoritos visível no menu | 0,5 pt |
| Navegação entre páginas com React Router | 1,0 pt |
| Paginação funcionando nas três páginas de listagem | 1,0 pt |

### Qualidade do código (2 pontos)

| Critério | Pontos |
|---|---|
| Componentes bem separados e com responsabilidade clara | 1,0 pt |
| Uso adequado dos hooks (`useState`, `useEffect`, `useContext`, `useRef`) | 1,0 pt |

### Nota mínima para aprovação: **7,0**

---

## ⏰ Política de atraso

A nota sofre desconto progressivo por semana de atraso:

| Atraso | Desconto |
|---|---|
| Até a data limite | Sem desconto |
| 1 semana de atraso | −2,0 pontos |
| 2 semanas de atraso | −4,0 pontos |
| 3 semanas de atraso | −6,0 pontos |
| Mais de 3 semanas | Projeto não aceito |

> Exemplo: projeto com nota 8,0 entregue com 1 semana de atraso → nota final **6,0**.

---

## 📬 Como entregar

Envie um e-mail para **neliofrazac@gmail.com** com:

- **Assunto:** `Projeto JavaScript`
- **Corpo do e-mail:**

```
Nome completo:
Matrícula:
Link do repositório:
```

> ⚠️ E-mails fora deste formato ou sem todos os campos podem não ser contabilizados. Confira antes de enviar.

---

## 🔗 Referências

| Recurso | Link |
|---|---|
| Documentação oficial do React | [react.dev](https://react.dev) |
| React Router | [reactrouter.com/docs](https://reactrouter.com/docs) |
| JavaScript moderno | [javascript.info](https://javascript.info) |
| Rick and Morty API | [rickandmortyapi.com/documentation](https://rickandmortyapi.com/documentation) |
| Bootstrap + Vite | [getbootstrap.com/docs/5.3/getting-started/vite](https://getbootstrap.com/docs/5.3/getting-started/vite/) |
| Tailwind CSS + Vite | [tailwindcss.com/docs/installation/using-vite](https://tailwindcss.com/docs/installation/using-vite) |
| Deploy gratuito | [vercel.com](https://vercel.com) / [netlify.com](https://netlify.com) |

---

<p align="center">
  Dúvidas? Envie um e-mail para <strong>neliofrazac@gmail.com</strong>
</p>