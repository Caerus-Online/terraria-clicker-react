# Database Schema

## Public Schema

### Lifetime Stats Table
- Columns:
  - id (uuid, primary key)
  - user_id (uuid, references auth.users(id))
  - total_clicks (bigint, default: 0)
  - total_coins (bigint, default: 0)
  - total_prestiges (bigint, default: 0)
  - created_at (timestamp with time zone)
  - updated_at (timestamp with time zone)
- Relationships:
  - user_id references auth.users(id)

### Game Progress Table
- Columns:
  - id (uuid, primary key)
  - user_id (uuid, references auth.users(id))
  - clicks (bigint, default: 0)
  - click_value (bigint, default: 1)
  - cps (bigint, default: 0)
  - prestige_currency (bigint, default: 0)
  - prestige_level (bigint, default: 0)
  - prestige_requirement (bigint, default: 1000)
  - created_at (timestamp with time zone)
  - updated_at (timestamp with time zone)
- Relationships:
  - user_id references auth.users(id)

### Leaderboard Table
- Columns:
  - id (uuid, primary key)
  - user_id (uuid, references auth.users(id))
  - username (text)
  - total_coins (bigint, default: 0)
  - prestige_level (bigint, default: 0)
  - achievements_earned (bigint, default: 0)
  - updated_at (timestamp with time zone)
- Relationships:
  - user_id references auth.users(id)

### Achievements Table
- Columns:
  - id (uuid, primary key)
  - user_id (uuid, references auth.users(id))
  - achievements (jsonb)
  - created_at (timestamp with time zone)
  - updated_at (timestamp with time zone)
- Relationships:
  - user_id references auth.users(id)

### Upgrades Table
- Columns:
  - id (uuid, primary key)
  - user_id (uuid, references auth.users(id))
  - tier_upgrades (jsonb)
  - sword_upgrades (jsonb)
  - summon_upgrades (jsonb)
  - artifacts (jsonb)
  - created_at (timestamp with time zone)
  - updated_at (timestamp with time zone)
- Relationships:
  - user_id references auth.users(id)

### Users Table
- Columns:
  - id (uuid, primary key)
  - username (text)
  - created_at (timestamp with time zone)
  - updated_at (timestamp with time zone)
- Relationships:
  - id references auth.users(id)

## Auth Schema

### Users Table
- Columns:
  - instance_id (uuid)
  - id (uuid, primary key)
  - aud (text)
  - role (text)
  - email (text)
  - encrypted_password (text)
  - email_confirmed_at (timestamp with time zone)
  - invited_at (timestamp with time zone)
  - confirmation_token (text)
  - confirmation_sent_at (timestamp with time zone)
  - recovery_token (text)
  - recovery_sent_at (timestamp with time zone)
  - phone (text)
  - created_at (timestamp with time zone)
  - updated_at (timestamp with time zone)
- Unique Constraints:
  - phone
  - email

### Sessions Table
- Columns:
  - id (uuid, primary key)
  - user_id (uuid, references auth.users(id))
  - created_at (timestamp with time zone)
  - updated_at (timestamp with time zone)
  - factor_id (uuid)
- Relationships:
  - user_id references auth.users(id)

### Identities Table
- Columns:
  - provider_id (text)
  - user_id (uuid, references auth.users(id))
  - identity_data (jsonb)
  - provider (text)
  - last_sign_in_at (timestamp with time zone)
- Relationships:
  - user_id references auth.users(id)

## Notes
- All numeric fields (clicks, coins, etc.) are stored as bigint to handle large numbers
- All timestamps include timezone information
- JSONB fields are used for complex data structures (upgrades, achievements)
- Foreign key relationships ensure data integrity
- Default values prevent null/undefined issues

