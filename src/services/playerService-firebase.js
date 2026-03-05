// Firebase Player Service
// This replaces the old Supabase playerService.js

import { auth } from '../lib/firebase';

export const playerService = {
  generatePlayerId() {
    const randomNum = Math.floor(Math.random() * 100000);
    return `player${randomNum}`;
  },

  getPlayerId() {
    let playerId = localStorage.getItem('playerId');
    if (!playerId) {
      playerId = this.generatePlayerId();
      localStorage.setItem('playerId', playerId);
    }
    return playerId;
  },

  isAnonymous() {
    // Check if user is not authenticated
    return !auth.currentUser;
  },

  getCurrentUser() {
    return auth.currentUser;
  },

  isAuthenticated() {
    return !!auth.currentUser;
  },

  clearPlayerId() {
    localStorage.removeItem('playerId');
  }
};
