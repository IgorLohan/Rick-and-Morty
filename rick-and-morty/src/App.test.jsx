import { render, screen, fireEvent } from '@testing-library/react'
import { vi, beforeEach } from 'vitest' // Removeu describe, it, expect daqui
import App from './App'
import '@testing-library/jest-dom'

// Mock global do fetch para evitar chamadas reais à API durante os testes
beforeEach(() => {
  global.fetch = vi.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ info: { pages: 1 }, results: [] }),
    })
  )
})

describe('Componente Estrutural App', () => {
  it('deve renderizar a Navbar e o título principal da aplicação', () => {
    render(<App />)

    // Verifica se o texto da marca na Navbar está presente na tela
    const logoTexto = screen.getByText('Rick & Morty')
    expect(logoTexto).toBeInTheDocument()
  })

  it('deve renderizar os itens de menu corretos na Navbar', () => {
    render(<App />)

    // Verifica se todos os links de navegação principais mapeados foram criados
    expect(screen.getByTitle('Personagens')).toBeInTheDocument()
    expect(screen.getByTitle('Episódios')).toBeInTheDocument()
    expect(screen.getByTitle('Localizações')).toBeInTheDocument()
    expect(screen.getByTitle('Favoritos')).toBeInTheDocument()
  })

  it('deve alternar a tela visível ao clicar em cada item da Navbar para testar todas as rotas', async () => {
    render(<App />)

    // 1. TESTAR ROTA: EPISÓDIOS
    const linkEpisodios = screen.getByTitle('Episódios')
    fireEvent.click(linkEpisodios)

    // 2. TESTAR ROTA: LOCALIZAÇÕES
    const linkLocalizacoes = screen.getByTitle('Localizações')
    fireEvent.click(linkLocalizacoes)

    // 3. TESTAR ROTA: FAVORITOS
    const linkFavoritos = screen.getByTitle('Favoritos')
    fireEvent.click(linkFavoritos)

    // 4. TESTAR ROTA: PERSONAGENS (Voltar para o início)
    const linkPersonagens = screen.getByTitle('Personagens')
    fireEvent.click(linkPersonagens)
  })
})