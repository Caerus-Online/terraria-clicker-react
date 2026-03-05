# Firebase Migration Plan: Terraria Clicker React

## Overview
This document outlines the comprehensive migration strategy from Supabase to Firebase for the Terraria Clicker React game. The migration involves replacing the Supabase backend with Firebase services while maintaining all existing functionality.

## Current Supabase Implementation Analysis

### Dependencies Identified
- **@supabase/supabase-js**: v2.46.2 - Main database and authentication client
- **Supabase Auth**: Email/password authentication with session management
- **Supabase Database**: PostgreSQL with real-time subscriptions
- **Supabase Storage**: Not currently used

### Database Schema (Supabase)
The current implementation uses 6 main tables:

1. **users** - User profile information
   - id (uuid, primary key)
   - username (text)
   - created_at, updated_at (timestamps)

2. **game_progress** - Current game state
   - user_id (uuid, foreign key)
   - clicks, click_value, cps (bigint)
   - prestige_currency, prestige_level, prestige_requirement (bigint)
   - last_update, updated_at (timestamps)

3. **upgrades** - User upgrade data
   - user_id (uuid, foreign key)
   - tier_upgrades, sword_upgrades, summon_upgrades, artifacts (jsonb)
   - updated_at (timestamp)

4. **achievements** - User achievement progress
   - user_id (uuid, foreign key)
   - achievements (jsonb)
   - created_at, updated_at (timestamps)

5. **lifetime_stats** - Cumulative user statistics
   - user_id (uuid, foreign key)
   - total_clicks, total_coins, total_prestiges (bigint)
   - created_at, updated_at (timestamps)

6. **leaderboard** - Leaderboard entries
   - user_id (uuid, foreign key)
   - username (text)
   - total_coins, prestige_level, achievements_earned (bigint)
   - updated_at (timestamp)

### Authentication Flow
- Email/password authentication via Supabase Auth
- Session management with automatic token refresh
- Real-time auth state changes
- Username stored in separate users table

### Key Features to Migrate
1. **User Authentication** - Login/signup with email/password
2. **Game Progress Saving** - Real-time game state persistence
3. **Leaderboard System** - Global rankings with validation
4. **Achievement System** - Progress tracking and unlocking
5. **Upgrade System** - User upgrade purchases and levels
6. **Real-time Updates** - Live data synchronization
7. **Data Validation** - Anti-cheat mechanisms

## Firebase Migration Strategy

### 1. Firebase Services Required

#### Firebase Authentication
- **Email/Password Authentication**: Replace Supabase Auth
- **User Management**: Handle user sessions and profiles
- **Custom Claims**: For admin/user roles if needed

#### Cloud Firestore
- **Primary Database**: Replace Supabase PostgreSQL
- **Real-time Capabilities**: Maintain live updates
- **Document Structure**: Map to current table structure

#### Firebase Security Rules
- **Data Protection**: Replace Supabase RLS policies
- **Validation Logic**: Implement anti-cheat mechanisms
- **Access Control**: User-based data isolation

#### Firebase Functions (Optional)
- **Complex Validations**: Server-side validation logic
- **Data Aggregation**: Leaderboard calculations
- **Migration Scripts**: Data transfer utilities

### 2. Data Structure Mapping

#### Firestore Collections Structure

```
/users/{userId}
  - username: string
  - email: string
  - createdAt: timestamp
  - updatedAt: timestamp

/gameProgress/{userId}
  - userId: string
  - clicks: number
  - clickValue: number
  - cps: number
  - prestigeCurrency: number
  - prestigeLevel: number
  - prestigeRequirement: number
  - lastUpdate: timestamp
  - updatedAt: timestamp

/upgrades/{userId}
  - userId: string
  - tierUpgrades: array
  - swordUpgrades: array
  - summonUpgrades: array
  - artifacts: array
  - updatedAt: timestamp

/achievements/{userId}
  - userId: string
  - achievements: array
  - createdAt: timestamp
  - updatedAt: timestamp

/lifetimeStats/{userId}
  - userId: string
  - totalClicks: number
  - totalCoins: number
  - totalPrestiges: number
  - createdAt: timestamp
  - updatedAt: timestamp

/leaderboard/{userId}
  - userId: string
  - username: string
  - totalCoins: number
  - prestigeLevel: number
  - achievementsEarned: number
  - updatedAt: timestamp
```

### 3. Implementation Steps

#### Phase 1: Setup Firebase Project
1. Create Firebase project in Firebase Console
2. Enable Authentication (Email/Password)
3. Set up Cloud Firestore database
4. Configure Firebase SDK in React app

#### Phase 2: Replace Authentication System
1. Install Firebase SDK: `npm install firebase`
2. Create Firebase config file (`src/lib/firebase.js`)
3. Replace `AuthContext.jsx` with Firebase Auth
4. Update `AuthModal.jsx` for Firebase Auth methods
5. Remove Supabase auth dependencies

#### Phase 3: Migrate Database Service
1. Create new `firebaseDatabaseService.js`
2. Replace all Supabase client calls with Firebase Firestore
3. Implement real-time listeners for live updates
4. Add Firebase error handling

#### Phase 4: Update Security Rules
1. Write Firestore security rules
2. Implement data validation rules
3. Add anti-cheat mechanisms
4. Test access control

#### Phase 5: Data Migration (Optional)
1. Create migration script to transfer existing data
2. Export data from Supabase
3. Import to Firestore
4. Validate data integrity

#### Phase 6: Testing & Deployment
1. Test all functionality with Firebase
2. Verify real-time updates work
3. Test authentication flow
4. Deploy to production

### 4. Code Changes Required

#### Package Dependencies
**Remove:**
```json
"@supabase/supabase-js": "^2.46.2"
```

**Add:**
```json
"firebase": "^10.0.0"
```

#### File Changes Required

1. **src/lib/firebase.js** (New)
   - Firebase configuration and initialization
   - Export auth, firestore instances

2. **src/contexts/AuthContext.jsx** (Major Update)
   - Replace Supabase auth with Firebase auth
   - Update user state management
   - Replace real-time subscriptions

3. **src/components/auth/AuthModal.jsx** (Major Update)
   - Replace Supabase auth methods with Firebase
   - Update signup/login flow
   - Handle Firebase error codes

4. **src/services/databaseService.js** (Complete Rewrite)
   - Replace all Supabase calls with Firestore
   - Update data validation logic
   - Implement real-time listeners
   - Maintain same API interface

5. **src/App.jsx** (Minor Updates)
   - Update imports for Firebase
   - Remove Supabase references

6. **Environment Variables** (Update)
   - Replace Supabase env vars with Firebase config
   - Update .env.example

### 5. Security Rules Implementation

#### Firestore Security Rules Structure
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own documents
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /gameProgress/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId
        && validateGameProgress(request.resource.data);
    }
    
    // Leaderboard is read-only for all authenticated users
    match /leaderboard/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId
        && validateLeaderboardUpdate(request.resource.data);
    }
    
    // Functions for data validation
    function validateGameProgress(data) {
      return data.keys().hasAll(['clicks', 'clickValue', 'cps', 'prestigeCurrency'])
        && data.clicks is number
        && data.clicks >= 0
        && data.clickValue is number
        && data.clickValue >= 1;
    }
  }
}
```

### 6. Real-time Updates Migration

#### Supabase Real-time → Firestore Real-time
**Current (Supabase):**
```javascript
const channel = supabase.channel(`user_updates_${user.id}`)
  .on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, callback)
  .subscribe();
```

**New (Firebase):**
```javascript
const unsubscribe = onSnapshot(
  doc(db, 'users', userId),
  (doc) => callback(doc.data()),
  (error) => console.error('Real-time error:', error)
);
```

### 7. Data Validation & Anti-Cheat

#### Firebase Functions for Complex Validation
```javascript
// functions/validateGameProgress.js
exports.validateGameProgress = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Authentication required');
  }
  
  const { userId, progress } = data;
  const currentProgress = await getDocument('gameProgress', userId);
  
  // Implement validation logic similar to current Supabase implementation
  const timeDiff = Date.now() - currentProgress.lastUpdate.toMillis();
  const maxClicksPerSecond = 20;
  const maxPossibleClicks = (timeDiff / 1000) * maxClicksPerSecond;
  
  if (progress.clicks - currentProgress.clicks > maxPossibleClicks) {
    throw new functions.https.HttpsError('invalid-argument', 'Invalid click rate detected');
  }
  
  return { valid: true };
});
```

### 8. Migration Timeline

#### Week 1: Setup & Authentication
- Firebase project setup
- Authentication system replacement
- Basic testing

#### Week 2: Database Service Migration
- Complete databaseService.js rewrite
- Implement all CRUD operations
- Add real-time listeners

#### Week 3: Security & Validation
- Implement security rules
- Add data validation
- Anti-cheat mechanisms

#### Week 4: Testing & Deployment
- Comprehensive testing
- Performance optimization
- Production deployment

### 9. Risk Mitigation

#### Potential Issues
1. **Data Loss**: Implement backup strategy before migration
2. **Downtime**: Plan for minimal impact deployment
3. **Performance**: Test Firestore performance with current data size
4. **Real-time Issues**: Verify real-time updates work correctly

#### Rollback Strategy
- Keep Supabase configuration during migration
- Implement feature flags for quick rollback
- Monitor performance metrics closely

### 10. Post-Migration Benefits

#### Advantages of Firebase
1. **Scalability**: Better handling of large user bases
2. **Real-time**: More reliable real-time connections
3. **Security**: Comprehensive security rules system
4. **Ecosystem**: Integration with other Firebase services
5. **Performance**: Optimized for mobile/web applications

#### Cost Considerations
- Firebase offers generous free tier
- Predictable pricing based on usage
- Potential cost savings compared to Supabase

### 11. Testing Strategy

#### Unit Tests
- Test all database service methods
- Verify authentication flows
- Validate data transformation

#### Integration Tests
- Test real-time updates
- Verify security rules
- Test error handling

#### User Acceptance Testing
- Verify all game features work
- Test leaderboard functionality
- Validate achievement system

### 12. Monitoring & Analytics

#### Firebase Performance Monitoring
- Set up performance monitoring
- Track database operation times
- Monitor real-time connection health

#### Custom Analytics
- Track user engagement
- Monitor game progress patterns
- Analyze leaderboard activity

## Conclusion

This migration plan provides a comprehensive roadmap for transitioning from Supabase to Firebase while maintaining all existing functionality. The phased approach minimizes risk and ensures a smooth transition for users.

Key success factors:
1. Maintain API compatibility during transition
2. Implement thorough testing at each phase
3. Monitor performance closely post-migration
4. Have rollback strategy ready

The migration will result in a more scalable, secure, and performant backend infrastructure for the Terraria Clicker game.
