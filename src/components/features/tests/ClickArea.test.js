import { render, screen, fireEvent } from '@testing-library/react'
import ClickArea from '../ClickArea'

describe('ClickArea', () => {
  const defaultProps = {
    onClick: jest.fn(),
    coins: 100,
    clickValue: 5,
    isAnimating: false
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render click area with correct stats', () => {
    render(<ClickArea {...defaultProps} />)
    
    expect(screen.getByText('Battle Arena')).toBeInTheDocument()
    expect(screen.getByText('💰 100')).toBeInTheDocument()
    expect(screen.getByText('Click the sword to earn coins!')).toBeInTheDocument()
  })

  it('should display click value on sword', () => {
    render(<ClickArea {...defaultProps} />)
    
    expect(screen.getByText('+5')).toBeInTheDocument()
  })

  it('should call onClick when sword is clicked', () => {
    render(<ClickArea {...defaultProps} />)
    
    const swordButton = screen.getByRole('button')
    fireEvent.click(swordButton)
    
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1)
  })

  it('should show animation class when isAnimating is true', () => {
    render(<ClickArea {...defaultProps} isAnimating={true} />)
    
    const swordButton = screen.getByRole('button')
    expect(swordButton).toHaveClass('animate-pulse')
  })

  it('should format large coin numbers correctly', () => {
    render(<ClickArea {...defaultProps} coins={1500000} />)
    
    expect(screen.getByText('💰 1.5M')).toBeInTheDocument()
  })

  it('should show monster battle placeholder text', () => {
    render(<ClickArea {...defaultProps} />)
    
    expect(screen.getByText('🎯 Ready for monster battles...')).toBeInTheDocument()
    expect(screen.getByText('Monster system coming in Phase 2B')).toBeInTheDocument()
  })
})
