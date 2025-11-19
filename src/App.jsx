import { useState } from 'react'
import ClipForm from './components/ClipForm'
import ClipList from './components/ClipList'

function App() {
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08),transparent_55%)]" />

      <header className="relative z-10 py-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-4">
            <img src="/flame-icon.svg" alt="logo" className="w-12 h-12" />
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Anime Clips Vault</h1>
              <p className="text-blue-200/80">Save and browse your favorite anime moments</p>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-6 pb-20 space-y-8">
        <ClipForm onCreated={() => setRefreshKey((k) => k + 1)} />

        <section className="space-y-4">
          <h2 className="text-xl text-white/90 font-semibold">Your clips</h2>
          <ClipList refreshKey={refreshKey} />
        </section>
      </main>

      <footer className="relative z-10 py-8 text-center text-slate-400 text-sm">
        Tip: Set VITE_BACKEND_URL in your env to connect
      </footer>
    </div>
  )
}

export default App
