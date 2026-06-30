function Paginacao({ pagina, totalPaginas, onMudarPagina }) {
  if (totalPaginas <= 1) return null

  return (
    <nav className="flex items-center justify-center gap-4 mt-8" aria-label="Paginação">
      <button
        type="button"
        onClick={() => onMudarPagina(pagina - 1)}
        disabled={pagina <= 1}
        className="px-4 py-2 rounded-lg bg-slate-700 text-white text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-600 transition-colors"
      >
        Anterior
      </button>
      <span className="text-slate-300 text-sm">
        Página <strong className="text-green-400">{pagina}</strong> de{' '}
        <strong className="text-green-400">{totalPaginas}</strong>
      </span>
      <button
        type="button"
        onClick={() => onMudarPagina(pagina + 1)}
        disabled={pagina >= totalPaginas}
        className="px-4 py-2 rounded-lg bg-slate-700 text-white text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-600 transition-colors"
      >
        Próxima
      </button>
    </nav>
  )
}

export default Paginacao
