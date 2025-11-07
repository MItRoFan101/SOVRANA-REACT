import { useEffect, useState, useRef } from 'react'

export function useMetrics() {
	const [m, setM] = useState({ cpu: 0, memory: 0, requestsPerSec: 0 })
	const mounted = useRef(true)

	useEffect(() => {
		mounted.current = true
		const id = setInterval(() => {
			if (!mounted.current) return
			setM({
				cpu: Math.round(10 + Math.random() * 80),
				memory: Math.round(15 + Math.random() * 75),
				requestsPerSec: Math.round(20 + Math.random() * 300)
			})
		}, 1500)
		return () => {
			mounted.current = false
			clearInterval(id)
		}
	}, [])

	return m
}
