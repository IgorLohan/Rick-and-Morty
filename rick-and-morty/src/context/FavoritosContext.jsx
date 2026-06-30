import { createContext, useContext, useState } from 'react'

const FavoritosContext = createContext()

export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState([])

  function adicionarFavorito(personagem) {
    setFavoritos((prev) => {
      if (prev.some((p) => p.id === personagem.id)) return prev
      return [...prev, personagem]
    })
  }

  function removerFavorito(id) {
    setFavoritos((prev) => prev.filter((p) => p.id !== id))
  }

  function toggleFavorito(personagem) {
    if (favoritos.some((p) => p.id === personagem.id)) {
      removerFavorito(personagem.id)
    } else {
      adicionarFavorito(personagem)
    }
  }

  function isFavorito(id) {
    return favoritos.some((p) => p.id === id)
  }

  return (
    <FavoritosContext.Provider
      value={{ favoritos, adicionarFavorito, removerFavorito, toggleFavorito, isFavorito }}
    >
      {children}
    </FavoritosContext.Provider>
  )
}

export function useFavoritos() {
  const context = useContext(FavoritosContext)
  if (!context) {
    throw new Error('useFavoritos deve ser usado dentro de FavoritosProvider')
  }
  return context
}
