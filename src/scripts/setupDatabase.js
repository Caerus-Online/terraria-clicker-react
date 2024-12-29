import { supabase } from '../lib/supabase';

const setupTables = async () => {
  // Users table
  await supabase.from('users').insert({
    id: '00000000-0000-0000-0000-000000000000',
    username: 'system',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });

  // Game progress table
  await supabase.from('game_progress').insert({
    user_id: '00000000-0000-0000-0000-000000000000',
    clicks: 0,
    click_value: 1,
    cps: 0,
    prestige_currency: 0,
    prestige_level: 0,
    prestige_requirement: 1000,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });

  // Upgrades table
  await supabase.from('upgrades').insert({
    user_id: '00000000-0000-0000-0000-000000000000',
    tier_upgrades: [],
    sword_upgrades: [],
    summon_upgrades: [],
    artifacts: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });

  // Achievements table
  await supabase.from('achievements').insert({
    user_id: '00000000-0000-0000-0000-000000000000',
    achievements: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });

  // Lifetime stats table
  await supabase.from('lifetime_stats').insert({
    user_id: '00000000-0000-0000-0000-000000000000',
    total_clicks: 0,
    total_coins: 0,
    total_prestiges: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });

  // Leaderboard table
  await supabase.from('leaderboard').insert({
    user_id: '00000000-0000-0000-0000-000000000000',
    username: 'system',
    total_coins: 0,
    prestige_level: 0,
    achievements_earned: 0,
    updated_at: new Date().toISOString()
  });

  // Enable RLS on users table
  await supabase.rpc('set_table_rls', { table_name: 'users', enabled: true });

  // Policy to allow users to read their own data
  await supabase.rpc('create_policy', {
    table_name: 'users',
    name: 'Users can read own data',
    definition: `auth.uid() = id`,
    action: 'SELECT',
    check: true
  });

  // Policy to allow new user creation during registration
  await supabase.rpc('create_policy', {
    table_name: 'users',
    name: 'Allow user registration',
    definition: `auth.uid() = id`,
    action: 'INSERT',
    check: true
  });

  // Policy to allow users to update their own data
  await supabase.rpc('create_policy', {
    table_name: 'users',
    name: 'Users can update own data',
    definition: `auth.uid() = id`,
    action: 'UPDATE',
    check: true
  });
};

export const setupDatabase = async () => {
  try {
    await setupTables();
    console.log('Database setup complete!');
  } catch (error) {
    console.error('Error setting up database:', error);
  }
};

window.setupDatabase = setupDatabase;