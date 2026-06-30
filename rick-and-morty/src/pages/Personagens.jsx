import { useState, useEffect, useRef } from 'react'
import PersonagemCard from '../components/PersonagemCard'
import Paginacao from '../components/Paginacao'
import { useFavoritos } from '../context/FavoritosContext'
import {
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'

const API_URL = 'https://rickandmortyapi.com/api/character'

const STATUS_OPCOES = [
  { label: 'Todos', value: '' },
  { label: 'Vivo', value: 'alive' },
  { label: 'Morto', value: 'dead' },
  { label: 'Desconhecido', value: 'unknown' },
]

function Personagens() {
  const [busca, setBusca] = useState('')
  const [termoBusca, setTermoBusca] = useState('')
  const [status, setStatus] = useState('')
  const [pagina, setPagina] = useState(1)
  const [personagens, setPersonagens] = useState([])
  const [totalPaginas, setTotalPaginas] = useState(1)
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)

  const inputBuscaRef = useRef(null)
  const { toggleFavorito, isFavorito } = useFavoritos()

  useEffect(() => {
    inputBuscaRef.current?.focus()
  }, [])

  useEffect(() => {
    async function buscarPersonagens() {
      setLoading(true)
      setErro(null)

      try {
        const params = new URLSearchParams({ page: pagina })
        if (termoBusca) params.set('name', termoBusca)
        if (status) params.set('status', status)

        const response = await fetch(`${API_URL}?${params}`)

        if (!response.ok) {
          if (response.status === 404) {
            setPersonagens([])
            setTotalPaginas(1)
            setErro('Nenhum personagem encontrado.')
            return
          }
          throw new Error('Erro ao buscar personagens.')
        }

        const data = await response.json()
        setPersonagens(data.results)
        setTotalPaginas(data.info.pages)
      } catch (err) {
        setErro(err.message || 'Erro ao carregar personagens.')
        setPersonagens([])
      } finally {
        setLoading(false)
      }
    }

    buscarPersonagens()
  }, [pagina, termoBusca, status])

  function handlePesquisar(e) {
    e.preventDefault()
    setPagina(1)
    setTermoBusca(busca.trim())
  }

  function handleStatusChange(novoStatus) {
    setStatus(novoStatus)
    setPagina(1)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-2">Personagens</h1>
      <p className="text-slate-400 mb-6">Todos os personagens do universo Rick and Morty</p>

      <form onSubmit={handlePesquisar} className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <MagnifyingGlassIcon className="w-5 h-5" />
          </span>
          <input
            ref={inputBuscaRef}
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por nome..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-green-400"
          />
        </div>
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2 rounded-lg bg-green-500 hover:bg-green-400 text-slate-900 font-semibold transition-colors"
        >
          Pesquisar
        </button>
      </form>

      <div className="flex flex-wrap gap-2 mb-8">
        {STATUS_OPCOES.map((opcao) => (
          <button
            key={opcao.value}
            type="button"
            onClick={() => handleStatusChange(opcao.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${status === opcao.value
                ? 'bg-green-500 text-slate-900'
                : 'bg-slate-700 text-white hover:bg-slate-600'
              }`}
          >
            {opcao.label}
          </button>
        ))}
      </div>

      {loading && (
        <p className="text-center text-slate-400 py-12">Carregando personagens...</p>
      )}

      {!loading && erro && personagens.length === 0 && (
        <p className="text-center text-red-400 py-12">{erro}</p>
      )}

      {!loading && personagens.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {personagens.map((personagem) => (
              <PersonagemCard
                key={personagem.id}
                personagem={personagem}
                isFavorito={isFavorito(personagem.id)}
                onToggleFavorito={toggleFavorito}
              />
            ))}
          </div>
          <Paginacao
            pagina={pagina}
            totalPaginas={totalPaginas}
            onMudarPagina={setPagina}
          />
        </>
      )}
    </div>
  )
}

export default Personagens
