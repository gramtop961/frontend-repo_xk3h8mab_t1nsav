import { useEffect, useState } from 'react'

export default function ClipList({ refreshKey }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${baseUrl}/api/clips`)
      if (!res.ok) throw new Error(`Failed ${res.status}`)
      const data = await res.json()
      setItems(data.items || [])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey])

  if (loading) return <div className="text-slate-400">Loading clips...</div>
  if (error) return <div className="text-red-400">{error}</div>

  if (!items.length) return <div className="text-slate-400">No clips yet. Add one above.</div>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((clip) => (
        <div key={clip.id} className="bg-slate-800/60 border border-slate-700 rounded-xl overflow-hidden">
          {clip.thumbnail_url ? (
            <img src={clip.thumbnail_url} alt={clip.title} className="w-full h-40 object-cover" />
          ) : (
            <div className="w-full h-40 bg-slate-900 flex items-center justify-center text-slate-500">No thumbnail</div>
          )}

          <div className="p-4 space-y-2">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-white font-semibold leading-tight">{clip.title}</h3>
                <p className="text-slate-400 text-sm">{clip.anime}{clip.episode ? ` • ${clip.episode}` : ''}</p>
              </div>
              <a
                href={clip.video_url}
                target="_blank"
                rel="noreferrer"
                className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded"
              >
                Watch
              </a>
            </div>
            {clip.notes && <p className="text-slate-300 text-sm">{clip.notes}</p>}
            {(clip.start_time != null || clip.end_time != null) && (
              <p className="text-slate-400 text-xs">{clip.start_time ?? 0}s — {clip.end_time ?? 'end'}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
