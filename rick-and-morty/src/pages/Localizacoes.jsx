import { useState, useEffect } from 'react'
import Paginacao from '../components/Paginacao'

const API_URL = 'https://rickandmortyapi.com/api/location'

function Localizacoes() {
  const [tipo, setTipo] = useState('')
  const [tipos, setTipos] = useState([])
  const [pagina, setPagina] = useState(1)
  const [localizacoes, setLocalizacoes] = useState([])
  const [totalPaginas, setTotalPaginas] = useState(1)
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    async function buscarTipos() {
      try {
        const tiposUnicos = new Set()
        let url = `${API_URL}?page=1`

        while (url) {
          const response = await fetch(url)
          if (!response.ok) break
          const data = await response.json()
          data.results.forEach((loc) => tiposUnicos.add(loc.type))
          url = data.info.next
        }

        setTipos([...tiposUnicos].sort())
      } catch {
        setTipos([])
      }
    }

    buscarTipos()
  }, [])

  useEffect(() => {
    async function buscarLocalizacoes() {
      setLoading(true)
      setErro(null)

      try {
        const params = new URLSearchParams({ page: pagina })
        if (tipo) params.set('type', tipo)

        const response = await fetch(`${API_URL}?${params}`)

        if (!response.ok) {
          if (response.status === 404) {
            setLocalizacoes([])
            setTotalPaginas(1)
            setErro('Nenhuma localização encontrada.')
            return
          }
          throw new Error('Erro ao buscar localizações.')
        }

        const data = await response.json()
        setLocalizacoes(data.results)
        setTotalPaginas(data.info.pages)
      } catch (err) {
        setErro(err.message || 'Erro ao carregar localizações.')
        setLocalizacoes([])
      } finally {
        setLoading(false)
      }
    }

    buscarLocalizacoes()
  }, [pagina, tipo])

  function handleTipoChange(novoTipo) {
    setTipo(novoTipo)
    setPagina(1)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-400 mb-6">Localizações</h1>

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          type="button"
          onClick={() => handleTipoChange('')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            tipo === ''
              ? 'bg-green-500 text-slate-900'
              : 'bg-slate-700 text-white hover:bg-slate-600'
          }`}
        >
          Todos
        </button>
        {tipos.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => handleTipoChange(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tipo === t
                ? 'bg-green-500 text-slate-900'
                : 'bg-slate-700 text-white hover:bg-slate-600'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {loading && (
        <p className="text-center text-slate-400 py-12">Carregando localizações...</p>
      )}

      {!loading && erro && localizacoes.length === 0 && (
        <p className="text-center text-red-400 py-12">{erro}</p>
      )}

      {!loading && localizacoes.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {localizacoes.map((localizacao) => (
              <article
                key={localizacao.id}
                className="bg-slate-800 rounded-xl p-5 border border-slate-700 shadow-lg"
              >
                <h3 className="text-lg font-bold text-white mb-3">{localizacao.name}</h3>
                <p className="text-slate-400 text-sm mb-1">
                  <span className="text-slate-500">Tipo:</span> {localizacao.type}
                </p>
                <p className="text-slate-400 text-sm">
                  <span className="text-slate-500">Dimensão:</span> {localizacao.dimension}
                </p>
              </article>
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

export default Localizacoes
