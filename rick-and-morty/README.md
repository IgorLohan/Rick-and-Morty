

# 🧪 Rick and Morty App

Uma aplicação web robusta de alto desempenho desenvolvida em React e estruturada com o ecossistema modular do Vite. O projeto consome a API oficial do Rick and Morty para listar, filtrar e gerenciar dados sobre personagens, episódios e localizações através de um fluxo assíncrono otimizado e gerenciamento de estado global nativo.

🚀 **Deploy ativo no Railway:** [rickmorty.up.railway.app](https://rickmorty.up.railway.app)

---

## 🛠️ Stack Tecnológica

* **[React 18](https://react.dev/):** Biblioteca para componentização reativa baseada em hooks de controle de ciclo de vida (`useState`, `useEffect`, `useRef`).
* **[Vite](https://vite.dev/):** Bundler e ambiente de execução com Fast Refresh instantâneo.
* **[Tailwind CSS (v4)](https://tailwindcss.com/):** Framework utilitário de estilização injetado via diretiva global de importação.
* **[React Router DOM v6](https://reactrouter.com/):** Motor de roteamento declarativo e SPA para controle histórico de navegação no cliente.
* **[Heroicons](https://heroicons.com/):** Conjuntos de ícones empacotados e otimizados para redução de bundle size (*Tree Shaking*).

---

## 📂 Arquitetura de Código Implementada

A estrutura interna reflete os princípios de responsabilidade única e escalabilidade de arquivos:

```
src/
├── components/
│   ├── EpisodioCard.jsx       # Card dinâmico com requisição sob demanda (Lazy Loading)
│   ├── Paginacao.jsx          # Componente puro de paginação genérica reútil
│   └── PersonagemCard.jsx     # Card isolado com controle visual de favoritos e status
├── context/
│   └── FavoritosContext.jsx   # Estado global para gerenciamento persistente em memória
├── pages/
│   ├── Personagens.jsx        # Dashboard com busca acoplada a queries parametrizadas
│   ├── Episodios.jsx          # Filtragem por mapeamento estático de ID por temporada
│   ├── Localizacoes.jsx       # Mapeamento e paginação de ecossistemas da API
│   └── Favoritos.jsx          # Renderização condicional do painel de itens salvos
├── App.jsx                    # Definição e inicialização de rotas e Providers
├── main.jsx                   # Ponto de inicialização do ciclo DOM (StrictMode)
└── style.css                  # Folha de estilo e normalizações globais do app

```

## 🚀 Como Rodar o Ambiente Localmente

```bash
# 1. Clone o repositório do projeto
git clone [https://github.com/IgorLohan/Rick-and-Morty.git](https://github.com/IgorLohan/Rick-and-Morty.git)

# 2. Navegue até o diretório do app front-end
cd Rick-and-Morty/rick-and-morty

# 3. Instale as dependências declaradas no package.json
npm install

# 4. Inicie o servidor local de desenvolvimento do Vite
npm run dev

```

---

## ✍️ Convenção de Commits Adotada

O histórico de desenvolvimento deste projeto segue rigidamente o padrão de **Conventional Commits** para garantir transparência e rastreabilidade na evolução do código:

* `feat`: Desenvolvimento de novas rotas ou componentes lógicos.
* `fix`: Correções de imports ou comportamento de layouts quebrados.
* `build`: Instalação e atualização de pacotes no ecossistema npm.
* `style`: Ajustes estéticos globais de fontes, margens ou resets no `style.css`.
* `chore`: Configurações de rotas, metadados de arquivos HTML ou deploys.
