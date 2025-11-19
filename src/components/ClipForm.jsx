import { useState } from 'react'

export default function ClipForm({ onCreated }) {
  const [form, setForm] = useState({
    title: '',
    anime: '',
    episode: '',
    start_time: '',
    end_time: '',
    video_url: '',
    thumbnail_url: '',
    notes: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const payload = {
        title: form.title.trim(),
        anime: form.anime.trim(),
        episode: form.episode || undefined,
        start_time: form.start_time ? Number(form.start_time) : undefined,
        end_time: form.end_time ? Number(form.end_time) : undefined,
        video_url: form.video_url.trim(),
        thumbnail_url: form.thumbnail_url || undefined,
        notes: form.notes || undefined,
      }

      const res = await fetch(`${baseUrl}/api/clips`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.detail || `Request failed: ${res.status}`)
      }

      await res.json()
      // reset form
      setForm({
        title: '',
        anime: '',
        episode: '',
        start_time: '',
        end_time: '',
        video_url: '',
        thumbnail_url: '',
        notes: '',
      })
      onCreated?.()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-slate-300 mb-1">Title</label>
          <input name="title" value={form.title} onChange={handleChange} required className="w-full bg-slate-900/60 border border-slate-700 rounded px-3 py-2 text-slate-100" placeholder="Epic fight scene" />
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-1">Anime</label>
          <input name="anime" value={form.anime} onChange={handleChange} required className="w-full bg-slate-900/60 border border-slate-700 rounded px-3 py-2 text-slate-100" placeholder="Demon Slayer" />
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-1">Episode</label>
          <input name="episode" value={form.episode} onChange={handleChange} className="w-full bg-slate-900/60 border border-slate-700 rounded px-3 py-2 text-slate-100" placeholder="S02E05" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">Start (s)</label>
            <input name="start_time" type="number" min="0" step="0.1" value={form.start_time} onChange={handleChange} className="w-full bg-slate-900/60 border border-slate-700 rounded px-3 py-2 text-slate-100" placeholder="0" />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">End (s)</label>
            <input name="end_time" type="number" min="0" step="0.1" value={form.end_time} onChange={handleChange} className="w-full bg-slate-900/60 border border-slate-700 rounded px-3 py-2 text-slate-100" placeholder="10.5" />
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-slate-300 mb-1">Video URL</label>
          <input name="video_url" value={form.video_url} onChange={handleChange} required className="w-full bg-slate-900/60 border border-slate-700 rounded px-3 py-2 text-slate-100" placeholder="https://.../clip.mp4" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-slate-300 mb-1">Thumbnail URL</label>
          <input name="thumbnail_url" value={form.thumbnail_url} onChange={handleChange} className="w-full bg-slate-900/60 border border-slate-700 rounded px-3 py-2 text-slate-100" placeholder="https://.../thumb.jpg" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-slate-300 mb-1">Notes / Tags</label>
          <input name="notes" value={form.notes} onChange={handleChange} className="w-full bg-slate-900/60 border border-slate-700 rounded px-3 py-2 text-slate-100" placeholder="fight, sword, final move" />
        </div>
      </div>

      {error && (
        <div className="text-red-400 text-sm">{error}</div>
      )}

      <div className="flex items-center gap-3">
        <button disabled={loading} className="bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-medium px-4 py-2 rounded-lg transition-colors">
          {loading ? 'Saving...' : 'Save clip'}
        </button>
        <a href="/test" className="text-slate-400 hover:text-slate-200 text-sm underline">Check backend</a>
      </div>
    </form>
  )
}
