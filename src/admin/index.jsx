import React, { Suspense } from 'react'
import { useAuth } from './hooks/useAuth'
const AdminApp = React.lazy(() => import('./AdminApp'))

function ProtectedAdminLoader() {
	const { checking, isAdmin } = useAuth()
	if (checking) return <div style={{ padding: 20 }}>Checking admin access...</div>
	if (!isAdmin) return <div style={{ padding: 20, color: 'crimson' }}>Access denied — admins only.</div>
	return (
		<Suspense fallback={<div style={{ padding: 20 }}>Loading admin...</div>}>
			<AdminApp />
		</Suspense>
	)
}

export const adminRoute = {
	path: '/admin',
	element: <ProtectedAdminLoader />
}

export default ProtectedAdminLoader
