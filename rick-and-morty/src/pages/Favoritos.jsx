import { Link } from 'react-router-dom'
import PersonagemCard from '../components/PersonagemCard'
import { useFavoritos } from '../context/FavoritosContext'

function Favoritos() {
  const { favoritos, removerFavorito } = useFavoritos()

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-400 mb-6">Favoritos</h1>

      {favoritos.length === 0 ? (
        <div className="text-center py-12 flex flex-col items-center justify-center gap-4">
          <p className="text-slate-400 text-lg">
            Você ainda não tem favoritos
          </p>
          <p className="text-slate-500 text-sm max-w-sm">
            Explore os personagens e clique no ícone de coração para favoritar.
          </p>
          <Link
            to="/personagens"
            className="mt-2 px-6 py-2.5 rounded-lg bg-green-500 text-slate-900 font-semibold hover:bg-green-400 transition-colors shadow-lg shadow-green-500/20 text-sm"
          >
            Explorar Personagens
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {favoritos.map((personagem) => (
            <PersonagemCard
              key={personagem.id}
              personagem={personagem}
              onRemover={removerFavorito}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Favoritos