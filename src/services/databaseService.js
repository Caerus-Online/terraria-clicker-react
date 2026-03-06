import { doc, setDoc, getDoc, updateDoc, onSnapshot, collection, query, where, getDocs } from 'firebase/firestore'
import { db } from './firebase.js'

class DatabaseService {
  // User Management
  async createUserProfile(userId, userData) {
    const userRef = doc(db, 'users', userId)
    await setDoc(userRef, {
      id: userId,
      username: userData.username,
      email: userData.email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...userData
    })
  }

  async getUserProfile(userId) {
    const userRef = doc(db, 'users', userId)
    const userDoc = await getDoc(userRef)
    return userDoc.exists() ? userDoc.data() : null
  }

  async updateUserProfile(userId, updates) {
    const userRef = doc(db, 'users', userId)
    await updateDoc(userRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    })
  }

  // Game Progress
  async createGameProgress(userId, initialData = {}) {
    const progressRef = doc(db, 'gameProgress', userId)
    await setDoc(progressRef, {
      userId,
      coins: 0,
      clickValue: 1,
      cps: 0,
      prestigeLevel: 0,
      prestigeCurrency: 0,
      clicks: 0,
      totalCoins: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...initialData
    })
  }

  async getGameProgress(userId) {
    const progressRef = doc(db, 'gameProgress', userId)
    const progressDoc = await getDoc(progressRef)
    return progressDoc.exists() ? progressDoc.data() : null
  }

  async updateGameProgress(userId, updates) {
    const progressRef = doc(db, 'gameProgress', userId)
    await updateDoc(progressRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    })
  }

  // Real-time listeners
  subscribeToGameProgress(userId, callback) {
    const progressRef = doc(db, 'gameProgress', userId)
    return onSnapshot(progressRef, (doc) => {
      if (doc.exists()) {
        callback(doc.data())
      }
    })
  }

  subscribeToUserProfile(userId, callback) {
    const userRef = doc(db, 'users', userId)
    return onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        callback(doc.data())
      }
    })
  }

  // Leaderboard
  async getLeaderboard(limit = 50) {
    const leaderboardRef = collection(db, 'leaderboard')
    const q = query(leaderboardRef, orderBy('totalCoins', 'desc'), limit(limit))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => doc.data())
  }

  async updateLeaderboard(userId, username, stats) {
    const leaderboardRef = doc(db, 'leaderboard', userId)
    await setDoc(leaderboardRef, {
      userId,
      username,
      totalCoins: stats.totalCoins,
      prestigeLevel: stats.prestigeLevel,
      achievementsEarned: stats.achievementsEarned || 0,
      updatedAt: new Date().toISOString()
    }, { merge: true })
  }

  // Username availability check
  async isUsernameAvailable(username, excludeUserId = null) {
    const usersRef = collection(db, 'users')
    const q = query(usersRef, where('username', '==', username))
    const snapshot = await getDocs(q)
    
    if (snapshot.empty) return true
    
    // If excluding a user ID, check if the only result is that user
    if (excludeUserId && snapshot.docs.length === 1) {
      return snapshot.docs[0].id === excludeUserId
    }
    
    return false
  }
}

export const databaseService = new DatabaseService()
export default databaseService
