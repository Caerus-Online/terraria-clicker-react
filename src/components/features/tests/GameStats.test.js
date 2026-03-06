import { render, screen } from '@testing-library/react'
import GameStats from '../GameStats'

describe('GameStats', () => {
  const defaultProps = {
    coins: 1000,
    clickValue: 5,
    cps: 10,
    clicks: 500,
    prestigeLevel: 2
  }

  it('should render all game stats correctly', () => {
    render(<GameStats {...defaultProps} />)
    
    expect(screen.getByText('Game Stats')).toBeInTheDocument()
    expect(screen.getByText('💰 Coins')).toBeInTheDocument()
    expect(screen.getByText('⚔️ Click Power')).toBeInTheDocument()
    expect(screen.getByText('⚡ CPS')).toBeInTheDocument()
    expect(screen.getByText('👆 Total Clicks')).toBeInTheDocument()
    expect(screen.getByText('🌟 Prestige')).toBeInTheDocument()
  })

  it('should display correct values', () => {
    render(<GameStats {...defaultProps} />)
    
    expect(screen.getByText('1000')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('500')).toBeInTheDocument()
    expect(screen.getByText('Level 2')).toBeInTheDocument()
  })

  it('should format large numbers correctly', () => {
    render(<GameStats 
      coins={1500000} 
      clickValue={5000} 
      cps={25000} 
      clicks={1000000} 
      prestigeLevel={10} 
    />)
    
    expect(screen.getByText('💰 Coins')).toBeInTheDocument()
    expect(screen.getByText('1.5M')).toBeInTheDocument() // coins
    expect(screen.getByText('5K')).toBeInTheDocument()    // clickValue
    expect(screen.getByText('25K')).toBeInTheDocument()   // cps
    expect(screen.getByText('1M')).toBeInTheDocument()    // clicks
    expect(screen.getByText('Level 10')).toBeInTheDocument()
  })

  it('should show prestige progress correctly', () => {
    render(<GameStats {...defaultProps} />)
    
    expect(screen.getByText('Prestige Progress')).toBeInTheDocument()
    expect(screen.getByText('500/1000')).toBeInTheDocument()
    expect(screen.getByText('500 clicks to prestige')).toBeInTheDocument()
  })

  it('should show prestige available when clicks >= 1000', () => {
    render(<GameStats {...defaultProps} clicks={1500} />)
    
    expect(screen.getByText('🎉 Prestige Available!')).toBeInTheDocument()
    expect(screen.getByText('0/1000')).toBeInTheDocument()
  })

  it('should show correct progress percentage', () => {
    render(<GameStats {...defaultProps} clicks={250} />)
    
    const progressBar = screen.getByRole('progressbar') || screen.getByText('250/1000').closest('div').querySelector('.bg-gradient-to-r')
    expect(progressBar).toHaveStyle({ width: '25%' })
  })

  it('should handle zero values gracefully', () => {
    render(<GameStats 
      coins={0} 
      clickValue={1} 
      cps={0} 
      clicks={0} 
      prestigeLevel={0} 
    />)
    
    expect(screen.getByText('0')).toBeInTheDocument()
    expect(screen.getByText('1000 clicks to prestige')).toBeInTheDocument()
  })
})
