import React, { useState, useEffect } from 'react';
import { databaseService } from '../../services/databaseService';
import { formatNumber } from '../../utils/formatNumber';
import coinIcon from '../../img/coin-icon.png';
import prestigeIcon from '../../img/platnium.png';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

const LeaderboardPanel = ({ 
  isOpen, 
  onClose, 
  onOpenAuth,
  lifetimeStats,
  prestigeLevel,
  userAchievements
}) => {
  const { user, username } = useAuth();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [userRank, setUserRank] = useState(null);
  const [userEntry, setUserEntry] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('coins');

  const handleRefresh = async () => {
    setRefreshing(true);
    setError(null);
    try {
      // First update the user's entry if logged in
      if (user && lifetimeStats && username) {
        await databaseService.updateLeaderboard(user.id, username, {
          totalCoins: Math.floor(Number(lifetimeStats.coins) || 0),
          prestigeLevel: Math.floor(Number(prestigeLevel) || 0),
          achievementsEarned: Math.floor(Number(userAchievements?.filter(a => a.earned).length) || 0)
        });
      }

      // Wait a moment for the update to propagate
      await new Promise(resolve => setTimeout(resolve, 500));

      // Then fetch the leaderboard
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .order('total_coins', { ascending: false })
        .limit(100);

      if (error) throw error;
      
      setLeaderboardData(data || []);
      
      if (user) {
        const userIndex = data?.findIndex(entry => entry.user_id === user.id);
        if (userIndex !== -1) {
          setUserRank(userIndex + 1);
          setUserEntry(data[userIndex]);
        }
      }
      
      const cacheTime = Date.now();
      localStorage.setItem('leaderboardCacheTime', cacheTime.toString());
      setLastUpdate(new Date(cacheTime));
    } catch (err) {
      console.error('Leaderboard error:', err);
      setError('Failed to load leaderboard. Try again later.');
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      handleRefresh();
    }
  }, [isOpen]);

  // Format time difference
  const getUpdateText = () => {
    if (!lastUpdate) return 'Never updated';
    
    const now = new Date();
    const diff = now - lastUpdate;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just updated';
    if (minutes < 60) return `Updated ${minutes} minutes ago`;
    return `Updated ${Math.floor(minutes / 60)} hours ago`;
  };

  // Add this function to sort data based on active tab
  const getSortedData = () => {
    if (!leaderboardData.length) return [];
    return [...leaderboardData].sort((a, b) => {
      if (activeTab === 'coins') {
        return b.total_coins - a.total_coins;
      } else {
        return b.prestige_level - a.prestige_level;
      }
    });
  };

  if (!isOpen) return null;

  const sortedData = getSortedData();

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />
      
      {/* Leaderboard Panel */}
      <div className="relative bg-game-secondary bg-opacity-90 rounded-lg shadow-game max-w-2xl w-full m-4 max-h-[90vh] flex flex-col">
        {/* Header - Fixed */}
        <div className="flex justify-between items-center p-4 border-b border-game-accent">
          <div>
            <h2 className="font-game text-xl text-white">Leaderboard</h2>
            <div className="flex items-center space-x-2">
              <p className="text-xs text-white/70">{getUpdateText()}</p>
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="text-game-highlight hover:text-game-highlight/80 disabled:text-game-accent p-1 rounded"
                title="Refresh Leaderboard"
              >
                <span className={`material-icons text-sm ${refreshing ? 'animate-spin' : ''}`}>
                  refresh
                </span>
              </button>
            </div>
          </div>
          <button onClick={onClose}>
            <span className="material-icons text-white hover:text-game-highlight">close</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-4 border-b border-game-accent">
          <button
            onClick={() => setActiveTab('coins')}
            className={`flex items-center gap-2 px-4 py-2 rounded ${
              activeTab === 'coins'
                ? 'bg-game-highlight text-white'
                : 'bg-black bg-opacity-50 text-white hover:bg-opacity-70'
            }`}
          >
            <img src={coinIcon} alt="Coins" className="w-4 h-4" style={{ imageRendering: 'pixelated' }} />
            Coins
          </button>
          <button
            onClick={() => setActiveTab('prestige')}
            className={`flex items-center gap-2 px-4 py-2 rounded ${
              activeTab === 'prestige'
                ? 'bg-game-highlight text-white'
                : 'bg-black bg-opacity-50 text-white hover:bg-opacity-70'
            }`}
          >
            <img src={prestigeIcon} alt="Prestige" className="w-4 h-4" style={{ imageRendering: 'pixelated' }} />
            Prestige
          </button>
        </div>

        {/* Login Message - Fixed */}
        {!user && (
          <div className="bg-black bg-opacity-50 m-4 p-3 rounded-lg">
            <p className="text-sm text-white text-center">
              Want to appear on the leaderboard?{' '}
              <button 
                onClick={() => {
                  onClose();
                  onOpenAuth();
                }}
                className="text-game-highlight hover:underline"
              >
                Create an account
              </button>
              {' '}in settings to set your username!
            </p>
          </div>
        )}

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 min-h-0">
          {loading ? (
            <div className="text-center py-8">
              <span className="material-icons animate-spin text-4xl text-game-highlight">refresh</span>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500 font-game mb-4">{error}</p>
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="px-4 py-2 bg-game-highlight hover:bg-opacity-80 text-white rounded font-game"
              >
                Try Again
              </button>
            </div>
          ) : sortedData.length === 0 ? (
            <div className="text-center py-8 text-white">
              No entries yet. Be the first to join the leaderboard!
            </div>
          ) : (
            <div className="space-y-4">
              {sortedData.map((entry, index) => (
                <div 
                  key={entry.id}
                  className={`
                    bg-black bg-opacity-50 rounded-lg p-4 flex items-center justify-between
                    ${index < 3 ? 'border border-game-highlight' : ''}
                  `}
                >
                  {/* Rank */}
                  <div className="w-8 text-center font-game text-white">
                    {index + 1}.
                  </div>

                  {/* Username */}
                  <div className="flex-1 px-4 font-game text-white">
                    {entry.username}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center space-x-6">
                    {/* Total Coins */}
                    <div className="flex items-center space-x-2">
                      <img 
                        src={coinIcon} 
                        alt="Coins" 
                        className="w-4 h-4"
                        style={{ imageRendering: 'pixelated' }}
                      />
                      <span className="text-game-gold font-game">
                        {formatNumber(entry.total_coins)}
                      </span>
                    </div>

                    {/* Prestige Level */}
                    <div className="flex items-center space-x-2">
                      <img 
                        src={prestigeIcon} 
                        alt="Prestige" 
                        className="w-4 h-4"
                        style={{ imageRendering: 'pixelated' }}
                      />
                      <span className="text-purple-400 font-game">
                        {entry.prestige_level}
                      </span>
                    </div>

                    {/* Achievements */}
                    <div className="flex items-center space-x-2">
                      <span className="material-icons text-yellow-400" style={{ fontSize: '16px' }}>emoji_events</span>
                      <span className="text-yellow-400 font-game">
                        {entry.achievements_earned}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User's Position - Fixed at bottom */}
        {user && userEntry && (
          <div className="border-t border-game-accent p-4 bg-black bg-opacity-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-white font-game">Your Position:</span>
                <span className="text-game-highlight font-game">#{userRank}</span>
              </div>
              <div className="flex items-center space-x-6">
                {/* Total Coins */}
                <div className="flex items-center space-x-2">
                  <img 
                    src={coinIcon} 
                    alt="Coins" 
                    className="w-4 h-4"
                    style={{ imageRendering: 'pixelated' }}
                  />
                  <span className="text-game-gold font-game">
                    {formatNumber(userEntry.total_coins)}
                  </span>
                </div>

                {/* Prestige Level */}
                <div className="flex items-center space-x-2">
                  <img 
                    src={prestigeIcon} 
                    alt="Prestige" 
                    className="w-4 h-4"
                    style={{ imageRendering: 'pixelated' }}
                  />
                  <span className="text-purple-400 font-game">
                    {userEntry.prestige_level}
                  </span>
                </div>

                {/* Achievements */}
                <div className="flex items-center space-x-2">
                  <span className="material-icons text-yellow-400" style={{ fontSize: '16px' }}>emoji_events</span>
                  <span className="text-yellow-400 font-game">
                    {userEntry.achievements_earned}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Entry Message - Fixed at bottom */}
        {user && !userEntry && !loading && !error && (
          <div className="border-t border-game-accent p-4 bg-black bg-opacity-50">
            <p className="text-white text-center">
              You haven't appeared on the leaderboard yet. Keep playing to earn your rank!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPanel;
