import { HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'

const STATUS_LABELS = {
  Alive: 'Vivo',
  Dead: 'Morto',
  unknown: 'Desconhecido',
}

const STATUS_COLORS = {
  Alive: 'bg-green-500',
  Dead: 'bg-red-500',
  unknown: 'bg-gray-400',
}

function PersonagemCard({ personagem, isFavorito, onToggleFavorito, onRemover }) {
  const statusLabel = STATUS_LABELS[personagem.status] ?? personagem.status
  const statusColor = STATUS_COLORS[personagem.status] ?? 'bg-gray-400'

  return (
    <article className="bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700 flex flex-col">
      <div className="relative">
        <img
          src={personagem.image}
          alt={personagem.name}
          className="w-full h-48 object-cover"
        />

        {/* Botão flutuante do coração */}
        {onRemover ? (
          <button
            type="button"
            onClick={() => onRemover(personagem.id)}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:scale-110 transition-transform focus:outline-none"
            title="Remover dos favoritos"
          >
            <HeartIconSolid className="w-6 h-6 text-red-500" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onToggleFavorito(personagem)}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:scale-110 transition-transform focus:outline-none"
          >
            {isFavorito ? (
              <HeartIconSolid className="w-6 h-6 text-red-500" />
            ) : (
              <HeartIcon className="w-6 h-6 text-white hover:text-red-400" />
            )}
          </button>
        )}
      </div>

      {/* Informações do personagem */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <h3 className="text-lg font-bold text-green-400">{personagem.name}</h3>
        <p className="text-slate-300 text-sm">
          <span className="text-slate-400">Espécie:</span> {personagem.species}
        </p>
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <span className={`w-2.5 h-2.5 rounded-full ${statusColor}`} />
          {statusLabel}
        </div>
      </div>
    </article>
  )
}

export default PersonagemCard