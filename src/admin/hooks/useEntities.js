import { useEffect, useRef, useState } from 'react'
const KEY = 'admin_demo_entities_v1'
let idCounter = Date.now()

function read() {
	try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] }
}
function write(v) { localStorage.setItem(KEY, JSON.stringify(v)) }

export function useEntities() {
	const cache = useRef([])
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		let m = true
		setLoading(true)
		setTimeout(() => {
			try {
				let existing = read()
				if (!existing || existing.length === 0) {
					existing = Array.from({length:14}).map((_,i)=>({ id: ++idCounter, name: `User ${i+1}`, description: `Demo user ${i+1}`, status: Math.random()>0.2 ? 'active':'disabled', createdAt: Date.now()-i*100000 }))
					write(existing)
				}
				cache.current = existing
				if (m) setData(existing.slice())
				setLoading(false)
			} catch (err) { setError(err); setLoading(false) }
		}, 350)
		return ()=>{ m=false }
	}, [])

	const persist = (next) => { cache.current = next.slice(); write(cache.current); setData(cache.current.slice()) }

	async function createEntity(payload) {
		const ent = { id: ++idCounter, ...payload, createdAt: Date.now() }
		persist([ent, ...cache.current])
		return ent
	}
	async function updateEntity(id, payload) {
		const next = cache.current.map(e => e.id === id ? { ...e, ...payload, updatedAt: Date.now() } : e)
		persist(next)
		return next.find(e => e.id === id)
	}
	async function deleteEntity(id) {
		const next = cache.current.filter(e => e.id !== id)
		persist(next)
		return true
	}

	return { data, loading, error, createEntity, updateEntity, deleteEntity }
}
