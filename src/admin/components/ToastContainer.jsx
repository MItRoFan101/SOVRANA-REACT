import React from 'react'
import { useToasts } from '../hooks/useToasts'

export default function ToastContainer() {
	const { toasts, remove } = useToasts()
	return (
		<div style={{ position: 'fixed', right: 12, bottom: 12, zIndex: 1050, display: 'flex', flexDirection: 'column', gap: 8 }}>
			{toasts.map(t => (
				<div key={t.id} style={{ background: '#111', color: '#fff', padding: 8, borderRadius: 6, minWidth: 160 }}>
					<div style={{ fontWeight: 600 }}>{t.title || 'Notification'}</div>
					<div style={{ fontSize: 12 }}>{t.message}</div>
					<div style={{ marginTop: 6, textAlign: 'right' }}>
						<button onClick={() => remove(t.id)} style={{ color: '#fff', background: 'transparent' }}>Close</button>
					</div>
				</div>
			))}
		</div>
	)
}
