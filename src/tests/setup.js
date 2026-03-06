import '@testing-library/jest-dom'

// Mock Firebase for testing
jest.mock('../services/firebase', () => ({
  auth: {
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
    onAuthStateChanged: jest.fn(),
  },
  firestore: {
    collection: jest.fn(),
    doc: jest.fn(),
    setDoc: jest.fn(),
    getDoc: jest.fn(),
    updateDoc: jest.fn(),
    onSnapshot: jest.fn(),
  },
}))

// Mock asset loading for testing
jest.mock('../hooks/useAssets', () => ({
  useAssets: () => ({
    assets: {},
    loading: false,
    error: null,
  }),
}))

// Global test utilities
global.testUtils = {
  createMockUser: (overrides = {}) => ({
    uid: 'test-uid',
    email: 'test@example.com',
    displayName: 'Test User',
    ...overrides,
  }),
  
  createMockGameState: (overrides = {}) => ({
    coins: 1000,
    clickValue: 1,
    cps: 0,
    prestigeLevel: 0,
    clicks: 0,
    totalCoins: 0,
    ...overrides,
  }),

  createMockBoss: (overrides = {}) => ({
    id: 'test-boss',
    name: 'Test Boss',
    hp: 1000,
    maxHp: 1000,
    rewards: [],
    ...overrides,
  }),

  createMockHero: (overrides = {}) => ({
    id: 'test-hero',
    name: 'Test Hero',
    level: 1,
    cost: 1000,
    effects: [],
    ...overrides,
  }),
}
