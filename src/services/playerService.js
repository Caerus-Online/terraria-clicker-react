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
    return !localStorage.getItem('supabase.auth.token');
  },

  getDisplayName() {
    return localStorage.getItem('playerId') || 'Anonymous';
  }
}; 