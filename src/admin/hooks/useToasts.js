import React, { createContext, useContext, useState, useCallback } from 'react'

const Ctx = createContext(null)

export function ToastsProvider({ children }) {
	const [toasts, setToasts] = useState([])
	const push = useCallback((t)=>{ const id = Date.now()+Math.random(); const t2 = { id, title: t.title, message: t.message }; setToasts(s=>[t2, ...s]); setTimeout(()=>setToasts(s=>s.filter(x=>x.id!==id)), t.ttl||3500); return id }, [])
	const remove = useCallback(id=>setToasts(s=>s.filter(t=>t.id!==id)), [])
	return <Ctx.Provider value={{ toasts, push, remove }}>{children}{toasts.length>0 && (
		<div style={{ position:'fixed', right:12, bottom:12, display:'flex', flexDirection:'column', gap:8, zIndex:1300 }}>
			{toasts.map(t=>(
				<div key={t.id} style={{ background:'#111', color:'#fff', padding:8, borderRadius:6, minWidth:180 }}>
					<div style={{ fontWeight:600 }}>{t.title || 'Notice'}</div>
					<div style={{ fontSize:13 }}>{t.message}</div>
					<div style={{ marginTop:6, textAlign:'right' }}><button onClick={()=>remove(t.id)} style={{ background:'transparent', color:'#fff' }}>Close</button></div>
				</div>
			))}
		</div>
	)}</Ctx.Provider>
}

export function useToasts() {
	const ctx = useContext(Ctx)
	if (!ctx) return { push: (t)=>console.log('toast', t), remove: ()=>{} }
	return ctx
}

// Wrap ToastsProvider around root of admin app in AdminApp if needed
// We'll mount at top-level of AdminApp by replacing it with provider if desired: