import { useEffect, useState } from 'react'

export function useSystemStatus() {
	const [status, setStatus] = useState({
		healthy: true,
		dbConnected: true,
		lastChecked: Date.now()
	})

	useEffect(() => {
		const id = setInterval(() => {
			setStatus({
				healthy: Math.random() > 0.05,
				dbConnected: Math.random() > 0.02,
				lastChecked: Date.now()
			})
		}, 5000)
		return () => clearInterval(id)
	}, [])

	return status
}
