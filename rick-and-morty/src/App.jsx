import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import { FavoritosProvider, useFavoritos } from './context/FavoritosContext'
import Personagens from './pages/Personagens'
import Episodios from './pages/Episodios'
import Localizacoes from './pages/Localizacoes'
import Favoritos from './pages/Favoritos'
import {
  UserGroupIcon,
  FilmIcon,
  MapPinIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'

const MENU_ITEMS = [
  { to: '/personagens', label: 'Personagens', icon: UserGroupIcon },
  { to: '/episodios', label: 'Episódios', icon: FilmIcon },
  { to: '/localizacoes', label: 'Localizações', icon: MapPinIcon },
  { to: '/favoritos', label: 'Favoritos', icon: HeartIcon },
]

function Navbar() {
  const { favoritos } = useFavoritos()

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 sm:px-4 rounded-lg text-sm font-medium transition-colors ${isActive
      ? 'bg-green-500 text-slate-900'
      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
    }`

  return (
    <header className="bg-slate-900 border-b border-slate-700 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <NavLink to="/personagens" className="flex items-center gap-2 text-xl font-bold text-green-400 hover:text-green-300">
          <img
            src="https://www.freeiconspng.com/uploads/rick-and-morty-icon-png-26.png"
            alt="Rick and Morty Icon"
            className="w-35 h-35 object-contain"
          />
          <span className="hidden sm:inline">Rick & Morty</span>
        </NavLink>

        <nav className="flex gap-1 sm:gap-2">
          {MENU_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={linkClass} title={label}>
              <Icon className="w-5 h-5 shrink-0" />
              <span className="hidden sm:inline">{label}</span>
              {to === '/favoritos' && favoritos.length > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-yellow-500 text-slate-900 text-xs font-bold shrink-0">
                  {favoritos.length}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

function App() {
  return (
    <FavoritosProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-950 text-white">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Navigate to="/personagens" replace />} />
              <Route path="/personagens" element={<Personagens />} />
              <Route path="/episodios" element={<Episodios />} />
              <Route path="/localizacoes" element={<Localizacoes />} />
              <Route path="/favoritos" element={<Favoritos />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </FavoritosProvider>
  )
}

export default App