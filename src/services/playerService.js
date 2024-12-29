import { supabase } from '../lib/supabase';

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
    return !supabase.auth.getSession();
  },

  async getDisplayName() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        return localStorage.getItem('playerId') || 'Anonymous';
      }

      const { data: userData, error } = await supabase
        .from('users')
        .select('username')
        .eq('id', session.user.id)
        .single();

      if (error) {
        console.error('Error fetching username:', error);
        return 'Anonymous';
      }

      return userData?.username || 'Anonymous';
    } catch (error) {
      console.error('Error in getDisplayName:', error);
      return 'Anonymous';
    }
  }
}; 