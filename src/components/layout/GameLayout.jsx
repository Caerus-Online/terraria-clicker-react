import React from 'react'

const GameLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Header */}
      <header className="bg-slate-950 border-b border-slate-700 px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-orange-400">Terraria Clicker</h1>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded hover:bg-slate-800 transition-colors">
              ⚙️ Settings
            </button>
          </div>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
      <footer className="mt-auto bg-slate-950 border-t border-slate-700 px-4 py-3">
        <div className="container mx-auto text-center text-sm text-slate-400">
          <p>Terraria Clicker RPG - Phase 2 Development</p>
        </div>
      </footer>
    </div>
  )
}

export default GameLayout
