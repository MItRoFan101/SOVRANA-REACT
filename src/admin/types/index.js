// basic runtime shapes / helpers. Swap to TS if project uses TypeScript.
export const sampleUsers = ['alice', 'bob', 'carol', 'dan']

export function formatPercent(n) {
	return `${Math.round(n)}%`
}

// Basic entity shape helper
export function makeEntity(name, description = '', status = 'active') {
	return { name, description, status }
}
