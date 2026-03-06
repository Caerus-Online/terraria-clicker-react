import { describe, it, expect } from '@jest/globals'

describe('Example Test Suite', () => {
  it('should pass a basic test', () => {
    expect(1 + 1).toBe(2)
  })

  it('should create mock user correctly', () => {
    const mockUser = global.testUtils.createMockUser({
      displayName: 'Custom User'
    })
    
    expect(mockUser.uid).toBe('test-uid')
    expect(mockUser.displayName).toBe('Custom User')
  })

  it('should create mock game state correctly', () => {
    const mockState = global.testUtils.createMockGameState({
      coins: 5000
    })
    
    expect(mockState.coins).toBe(5000)
    expect(mockState.clickValue).toBe(1)
  })
})
