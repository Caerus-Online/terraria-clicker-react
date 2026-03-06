import React from 'react'

const GameLayout = ({ children }) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/assets/images/backgrounds/terraria.png)'
        }}
      />
      
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      
      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex">
        {/* Sidebar Navigation */}
        <aside className="w-16 flex flex-col items-center py-4 space-y-4" style={{ backgroundColor: 'rgba(43, 37, 101, 0.7)', border: '2px solid black' }}>
          {/* Profile/Stats */}
          <button className="p-3 rounded hover:bg-white hover:bg-opacity-20 transition-colors group">
            <img src="/assets/images/ui/click-icon.png" alt="Profile" className="w-6 h-6" />
            <div className="absolute left-full ml-2 px-2 py-1 bg-black bg-opacity-75 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Profile & Stats
            </div>
          </button>

          {/* Shop */}
          <button className="p-3 rounded hover:bg-white hover:bg-opacity-20 transition-colors group">
            <img src="/assets/images/ui/coin-icon.png" alt="Shop" className="w-6 h-6" />
            <div className="absolute left-full ml-2 px-2 py-1 bg-black bg-opacity-75 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Shop
            </div>
          </button>

          {/* Prestige */}
          <button className="p-3 rounded hover:bg-white hover:bg-opacity-20 transition-colors group">
            <img src="/assets/images/ui/prestige1.png" alt="Prestige" className="w-6 h-6" />
            <div className="absolute left-full ml-2 px-2 py-1 bg-black bg-opacity-75 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Prestige
            </div>
          </button>

          {/* Achievements */}
          <button className="p-3 rounded hover:bg-white hover:bg-opacity-20 transition-colors group">
            <div className="text-black text-xl">🏆</div>
            <div className="absolute left-full ml-2 px-2 py-1 bg-black bg-opacity-75 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Achievements
            </div>
          </button>

          {/* Leaderboard */}
          <button className="p-3 rounded hover:bg-white hover:bg-opacity-20 transition-colors group">
            <div className="text-black text-xl">📊</div>
            <div className="absolute left-full ml-2 px-2 py-1 bg-black bg-opacity-75 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Leaderboard
            </div>
          </button>

          {/* Settings */}
          <button className="p-3 rounded hover:bg-white hover:bg-opacity-20 transition-colors group">
            <img src="/assets/images/ui/settings-icon.png" alt="Settings" className="w-6 h-6" />
            <div className="absolute left-full ml-2 px-2 py-1 bg-black bg-opacity-75 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Settings
            </div>
          </button>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Footer Info */}
          <div className="text-xs text-black writing-mode-vertical">
            v2.0
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header style={{ backgroundColor: 'rgba(43, 37, 101, 0.7)', border: '2px solid black', borderTop: 'none' }} className="px-6 py-3">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-orange-400" style={{ fontFamily: '"Andy-Bold", cursive' }}>
                Terraria Clicker
              </h1>
              <div className="flex items-center gap-4">
                <div className="text-sm text-black">
                  Phase 2 Development
                </div>
              </div>
            </div>
          </header>

          {/* Main Game Area */}
          <main className="flex-1 container mx-auto px-6 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
              {/* Left Panel - Stats */}
              <div className="lg:col-span-1 space-y-4">
                {children[0]} {/* Stats Panel */}
              </div>

              {/* Center Panel - Game Area */}
              <div className="lg:col-span-1">
                {children[1]} {/* Click Area */}
              </div>

              {/* Right Panel - Upgrades */}
              <div className="lg:col-span-1 space-y-4">
                {children[2]} {/* Upgrade Shop */}
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer style={{ backgroundColor: 'rgba(43, 37, 101, 0.7)', border: '2px solid black', borderTop: 'none' }} className="px-6 py-3">
            <div className="text-center text-sm text-black">
              Terraria Clicker RPG - Monster Battle System Coming Soon
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default GameLayout
