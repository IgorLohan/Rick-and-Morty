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

---
