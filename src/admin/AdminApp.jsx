import React, { useState } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Header from './components/Header/Header'
import Dashboard from './Dashboard'
import UsersPage from './pages/Users/Users'
import Analytics from './pages/Analytics/Analytics'
import Settings from './pages/Settings/Settings'
import { ToastsProvider } from './hooks/useToasts'
import styles from './styles/Admin.module.css'

export default function AdminApp() {
	const [section, setSection] = useState('dashboard') // internal nav
	return (
		<ToastsProvider>
			<div className={styles.adminRoot}>
				<Header />
				<div className={styles.layout}>
					<Sidebar section={section} onNavigate={setSection} />
					<main className={styles.content}>
						{section === 'dashboard' && <Dashboard />}
						{section === 'users' && <UsersPage />}
						{section === 'analytics' && <Analytics />}
						{section === 'settings' && <Settings />}
					</main>
				</div>
			</div>
		</ToastsProvider>
	)
}
