import React, { useState, useEffect } from 'react';
import supabase, { databaseService } from './lib/supabase';
import { toast, Toaster } from 'react-hot-toast';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    username: ''
  });
  const [editingUser, setEditingUser] = useState(null);
  const [editUsername, setEditUsername] = useState('');

  const loadUsers = async () => {
    try {
      // Get auth users first
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      if (authError) throw authError;

      // Get leaderboard data
      const { data: leaderboardData, error: leaderboardError } = await supabase
        .from('leaderboard')
        .select('*');
      if (leaderboardError) throw leaderboardError;

      // Get game progress data
      const { data: progressData, error: progressError } = await supabase
        .from('game_progress')
        .select('*');
      if (progressError) throw progressError;

      // Combine all data
      const combinedUsers = authUsers.users.map(authUser => {
        const leaderboard = leaderboardData.find(l => l.user_id === authUser.id);
        const progress = progressData.find(p => p.user_id === authUser.id);
        
        return {
          id: authUser.id,
          email: authUser.email,
          username: leaderboard?.username || 'No Username',
          created_at: authUser.created_at,
          game_progress: progress ? {
            clicks: progress.clicks,
            click_value: progress.click_value,
            cps: progress.cps,
            prestige_level: progress.prestige_level
          } : null,
          leaderboard: leaderboard ? {
            total_coins: leaderboard.total_coins,
            prestige_level: leaderboard.prestige_level
          } : null
        };
      });

      setUsers(combinedUsers);
    } catch (error) {
      console.error('Error loading users:', error);
      toast.error('Failed to load users');
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const createUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // First check if username is available
      const { data: existingUser } = await supabase
        .from('leaderboard')
        .select('username')
        .eq('username', newUser.username)
        .single();

      if (existingUser) {
        throw new Error('Username already taken');
      }

      // Create auth user with admin privileges
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: newUser.email,
        password: newUser.password,
        email_confirm: true
      });

      if (authError) throw authError;

      // Create leaderboard entry first (source of truth for username)
      const { error: leaderboardError } = await supabase
        .from('leaderboard')
        .insert([{
          user_id: authData.user.id,
          username: newUser.username,
          total_coins: 0,
          prestige_level: 0,
          achievements_earned: 0
        }]);

      if (leaderboardError) throw leaderboardError;

      // Then create user record with same username
      const { error: userError } = await supabase
        .from('users')
        .insert([{
          id: authData.user.id,
          username: newUser.username,
          created_at: new Date().toISOString()
        }]);

      if (userError) throw userError;

      // Initialize game data
      const { error: progressError } = await supabase
        .from('game_progress')
        .insert([{
          user_id: authData.user.id,
          clicks: 0,
          click_value: 1,
          cps: 0,
          prestige_currency: 0,
          prestige_level: 0,
          prestige_requirement: 1000
        }]);

      if (progressError) throw progressError;

      // Initialize upgrades
      const { error: upgradesError } = await supabase
        .from('upgrades')
        .insert([{
          user_id: authData.user.id,
          tier_upgrades: [],
          sword_upgrades: [],
          summon_upgrades: [],
          artifacts: []
        }]);

      if (upgradesError) throw upgradesError;

      // Initialize achievements
      const { error: achievementsError } = await supabase
        .from('achievements')
        .insert([{
          user_id: authData.user.id,
          achievements: []
        }]);

      if (achievementsError) throw achievementsError;

      // Initialize lifetime stats
      const { error: statsError } = await supabase
        .from('lifetime_stats')
        .insert([{
          user_id: authData.user.id,
          total_clicks: 0,
          total_coins: 0,
          total_prestiges: 0
        }]);

      if (statsError) throw statsError;

      toast.success('User created successfully');
      setShowCreateModal(false);
      setNewUser({ email: '', password: '', username: '' });
      loadUsers();
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      setLoading(true);
      
      // Delete all user data in sequence to ensure proper cleanup
      await supabase.from('game_progress').delete().eq('user_id', userId);
      await supabase.from('upgrades').delete().eq('user_id', userId);
      await supabase.from('achievements').delete().eq('user_id', userId);
      await supabase.from('lifetime_stats').delete().eq('user_id', userId);
      await supabase.from('leaderboard').delete().eq('user_id', userId);
      await supabase.from('users').delete().eq('id', userId);
      
      // Finally delete the auth user
      const { error: authError } = await supabase.auth.admin.deleteUser(userId);
      if (authError) throw authError;

      toast.success('User deleted successfully');
      loadUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error(`Error deleting user: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEditUsername = async (userId, currentUsername) => {
    setEditingUser(userId);
    setEditUsername(currentUsername);
  };

  const saveUsername = async (userId) => {
    try {
      setLoading(true);

      // Check if username is available (excluding current user)
      const { data: existingUser } = await supabase
        .from('leaderboard')
        .select('username')
        .eq('username', editUsername)
        .neq('user_id', userId)
        .single();

      if (existingUser) {
        throw new Error('Username already taken');
      }

      // Check if user exists in users table
      const { data: userData, error: userCheckError } = await supabase
        .from('users')
        .select('username')
        .eq('id', userId)
        .single();

      if (!userData) {
        // Create user record if it doesn't exist
        const { error: createError } = await supabase
          .from('users')
          .insert({
            id: userId,
            username: editUsername,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

        if (createError) throw createError;
      } else {
        // Update existing user record
        const { error: updateError } = await supabase
          .from('users')
          .update({ 
            username: editUsername,
            updated_at: new Date().toISOString()
          })
          .eq('id', userId);

        if (updateError) throw updateError;
      }

      // Update leaderboard entry
      const { error: leaderboardError } = await supabase
        .from('leaderboard')
        .update({ 
          username: editUsername,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId);

      if (leaderboardError) throw leaderboardError;

      toast.success('Username updated successfully');
      setEditingUser(null);
      loadUsers();
    } catch (error) {
      console.error('Error updating username:', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Toaster position="top-right" />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create User
        </button>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Create New User</h2>
            <form onSubmit={createUser}>
              <div className="mb-4">
                <label className="block mb-1">Email:</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Password:</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Username:</label>
                <input
                  type="text"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Game Progress
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingUser === user.id ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={editUsername}
                        onChange={(e) => setEditUsername(e.target.value)}
                        className="border rounded px-2 py-1 text-sm"
                      />
                      <button
                        onClick={() => saveUsername(user.id)}
                        className="text-green-600 hover:text-green-700"
                        disabled={loading}
                      >
                        <span className="material-icons text-sm">check</span>
                      </button>
                      <button
                        onClick={() => setEditingUser(null)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <span className="material-icons text-sm">close</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>{user.username}</span>
                      <button
                        onClick={() => handleEditUsername(user.id, user.username)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <span className="material-icons text-sm">edit</span>
                      </button>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(user.created_at).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    Clicks: {user.game_progress?.clicks || 0}
                  </div>
                  <div>
                    Click Value: {user.game_progress?.click_value || 1}
                  </div>
                  <div>
                    CPS: {user.game_progress?.cps || 0}
                  </div>
                  <div>
                    Prestige Level: {user.game_progress?.prestige_level || 0}
                  </div>
                  <div>
                    Total Coins: {user.leaderboard?.total_coins || 0}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this user and ALL their data?')) {
                        deleteUser(user.id);
                      }
                    }}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App; 