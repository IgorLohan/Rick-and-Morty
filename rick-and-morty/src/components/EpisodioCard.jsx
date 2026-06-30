import { useState } from 'react'

const API_CHARACTER = 'https://rickandmortyapi.com/api/character'

function EpisodioCard({ episodio }) {
  const [expandido, setExpandido] = useState(false)
  const [personagens, setPersonagens] = useState([])
  const [loadingPersonagens, setLoadingPersonagens] = useState(false)

  const numeroEpisodio = episodio.episode.match(/E(\d+)/)?.[1] ?? episodio.id
  const totalPersonagens = episodio.characters?.length ?? 0

  async function togglePersonagens() {
    if (expandido) {
      setExpandido(false)
      return
    }

    setExpandido(true)

    if (personagens.length > 0) return

    if (totalPersonagens === 0) return

    setLoadingPersonagens(true)

    try {
      const ids = episodio.characters.map((url) => url.split('/').pop()).join(',')
      const response = await fetch(`${API_CHARACTER}/${ids}`)
      if (!response.ok) throw new Error()

      const data = await response.json()
      setPersonagens(Array.isArray(data) ? data : [data])
    } catch {
      setPersonagens([])
    } finally {
      setLoadingPersonagens(false)
    }
  }

  return (
    <article className="bg-slate-800 rounded-xl p-5 border border-slate-700 shadow-lg flex flex-col gap-3">
      <span className="inline-block self-start px-3 py-1 rounded-md border border-green-500/50 bg-green-500/10 text-green-400 text-sm font-bold">
        {episodio.episode}
      </span>

      <h3 className="text-xl font-bold text-white">{episodio.name}</h3>

      <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-400 text-sm">
        <span className="flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0">
            <path fillRule="evenodd" d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z" clipRule="evenodd" />
          </svg>
          {episodio.air_date}
        </span>
        <span className="flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0">
            <path d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM1.49 15.326a.78.78 0 0 1-.358-.442 3 3 0 0 1 4.308-3.516 6.484 6.484 0 0 0-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 0 1-2.07-.655ZM16.44 15.98a4.97 4.97 0 0 0 2.066-1.867 3.3 3.3 0 0 0-.442-1.243 6.502 6.502 0 0 0-1.905-3.959 3 3 0 0 1 4.308 3.516.78.78 0 0 1-.358.442 4.97 4.97 0 0 0-2.669 1.011ZM10 11.25a5.47 5.47 0 0 0-5.47 5.47.75.75 0 1 0 1.5 0 3.97 3.97 0 0 1 3.97-3.97h.5a3.97 3.97 0 0 1 3.97 3.97.75.75 0 0 0 1.5 0A5.47 5.47 0 0 0 10 11.25Z" />
          </svg>
          {totalPersonagens} personagens
        </span>
        <span className="flex items-center gap-1.5">
          <span className="font-bold">#</span>
          Ep. {Number(numeroEpisodio)}
        </span>
      </div>

      {totalPersonagens > 0 && (
        <>
          <button
            type="button"
            onClick={togglePersonagens}
            className="flex items-center gap-1 text-green-400 hover:text-green-300 text-sm font-medium self-start transition-colors"
          >
            {expandido ? 'Ocultar personagens' : 'Ver personagens'}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`w-4 h-4 transition-transform ${expandido ? 'rotate-180' : ''}`}
            >
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z" clipRule="evenodd" />
            </svg>
          </button>

          {expandido && (
            <div className="flex flex-wrap gap-2 pt-1">
              {loadingPersonagens && (
                <span className="text-slate-400 text-sm">Carregando personagens...</span>
              )}
              {!loadingPersonagens && personagens.map((personagem) => (
                <span
                  key={personagem.id}
                  className="px-3 py-1 rounded-full bg-slate-900 border border-slate-600 text-slate-200 text-xs"
                >
                  {personagem.name}
                </span>
              ))}
            </div>
          )}
        </>
      )}
    </article>
  )
}

export default EpisodioCard
