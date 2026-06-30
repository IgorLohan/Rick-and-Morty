import { useState, useEffect } from 'react'
import Paginacao from '../components/Paginacao'
import EpisodioCard from '../components/EpisodioCard'

const API_URL = 'https://rickandmortyapi.com/api/episode'
const ITENS_POR_PAGINA = 20

const TEMPORADAS = [
  { label: 'Todas', value: '' },
  { label: 'T1', value: '1' },
  { label: 'T2', value: '2' },
  { label: 'T3', value: '3' },
  { label: 'T4', value: '4' },
  { label: 'T5', value: '5' },
]

const IDS_POR_TEMPORADA = {
  '1': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  '2': [12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
  '3': [22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
  '4': [32, 33, 34, 35, 36, 37, 38, 39, 40, 41],
  '5': [42, 43, 44, 45, 46, 47, 48, 49, 50, 51],
}

function Episodios() {
  const [temporada, setTemporada] = useState('')
  const [pagina, setPagina] = useState(1)
  const [episodios, setEpisodios] = useState([])
  const [totalPaginas, setTotalPaginas] = useState(1)
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    async function buscarEpisodios() {
      setLoading(true)
      setErro(null)

      try {
        if (!temporada) {
          const response = await fetch(`${API_URL}?page=${pagina}`)
          if (!response.ok) throw new Error('Erro ao buscar episódios.')

          const data = await response.json()
          setEpisodios(data.results)
          setTotalPaginas(data.info.pages)
        } else {
          const ids = IDS_POR_TEMPORADA[temporada]
          const response = await fetch(`${API_URL}/${ids.join(',')}`)
          if (!response.ok) throw new Error('Erro ao buscar episódios.')

          const data = await response.json()
          const todos = Array.isArray(data) ? data : [data]
          const total = Math.ceil(todos.length / ITENS_POR_PAGINA)
          const inicio = (pagina - 1) * ITENS_POR_PAGINA

          setEpisodios(todos.slice(inicio, inicio + ITENS_POR_PAGINA))
          setTotalPaginas(total || 1)
        }
      } catch (err) {
        setErro(err.message || 'Erro ao carregar episódios.')
        setEpisodios([])
      } finally {
        setLoading(false)
      }
    }

    buscarEpisodios()
  }, [pagina, temporada])

  function handleTemporadaChange(novaTemporada) {
    setTemporada(novaTemporada)
    setPagina(1)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-2">Episódios</h1>
      <p className="text-slate-400 mb-6">Todos os episódios do universo Rick and Morty</p>

      <div className="flex flex-wrap gap-2 mb-8">
        {TEMPORADAS.map((opcao) => (
          <button
            key={opcao.value}
            type="button"
            onClick={() => handleTemporadaChange(opcao.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
              temporada === opcao.value
                ? 'border-green-500 text-green-400 bg-green-500/10'
                : 'border-slate-600 text-slate-300 hover:border-slate-500 bg-transparent'
            }`}
          >
            {opcao.label}
          </button>
        ))}
      </div>

      {loading && (
        <p className="text-center text-slate-400 py-12">Carregando episódios...</p>
      )}

      {!loading && erro && (
        <p className="text-center text-red-400 py-12">{erro}</p>
      )}

      {!loading && !erro && episodios.length === 0 && (
        <p className="text-center text-slate-400 py-12">Nenhum episódio encontrado.</p>
      )}

      {!loading && episodios.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {episodios.map((episodio) => (
              <EpisodioCard key={episodio.id} episodio={episodio} />
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

export default Episodios
