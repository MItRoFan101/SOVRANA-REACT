import React, { useState } from 'react'

export default function ConfirmDialog({ title='Confirm', text='', onConfirm, onClose }) {
	const [busy, setBusy] = useState(false)
	return (
		<div style={{ position:'fixed', inset:0, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0,0,0,0.35)', zIndex:1200 }}>
			<div style={{ background:'#fff', padding:12, borderRadius:6, width:360 }}>
				<h4>{title}</h4>
				<p>{text}</p>
				<div style={{ display:'flex', gap:8, justifyContent:'flex-end' }}>
					<button onClick={onClose} disabled={busy}>Cancel</button>
					<button onClick={async ()=>{ setBusy(true); try { await onConfirm() } finally { setBusy(false); onClose() } }} style={{ background:'crimson', color:'#fff' }}>{busy ? 'Working...' : 'Confirm'}</button>
				</div>
			</div>
		</div>
	)
}
