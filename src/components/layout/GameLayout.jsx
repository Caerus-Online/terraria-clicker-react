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
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-black bg-opacity-60 backdrop-blur-sm border-b border-orange-900/30 px-4 py-3">
          <div className="container mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-bold text-orange-400" style={{ fontFamily: '"Andy-Bold", cursive' }}>
              Terraria Clicker
            </h1>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded hover:bg-white hover:bg-opacity-10 transition-colors">
                ⚙️ Settings
              </button>
            </div>
          </div>
        </header>

        {/* Main Game Area */}
        <main className="flex-1 container mx-auto px-4 py-6">
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
        <footer className="bg-black bg-opacity-60 backdrop-blur-sm border-t border-orange-900/30 px-4 py-3">
          <div className="container mx-auto text-center text-sm text-gray-300">
            <p>Terraria Clicker RPG - Phase 2 Development</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default GameLayout
