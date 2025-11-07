import React, { useState } from 'react'
import styles from '../Admin.module.css'

export default function Settings() {
  const [settings, setSettings] = useState({
    siteName: 'SOVRANA Admin',
    maintenanceMode: false,
    emailNotifications: true
  })

  return (
    <div className={styles.widget}>
      <h2>Settings</h2>
      <div className={styles.form}>
        <div>
          <label>Site Name</label>
          <input 
            type="text" 
            value={settings.siteName}
            onChange={e => setSettings({...settings, siteName: e.target.value})}
          />
        </div>
        <div>
          <label>
            <input 
              type="checkbox"
              checked={settings.maintenanceMode}
              onChange={e => setSettings({...settings, maintenanceMode: e.target.checked})}
            />
            Maintenance Mode
          </label>
        </div>
        <div>
          <label>
            <input 
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={e => setSettings({...settings, emailNotifications: e.target.checked})}
            />
            Email Notifications
          </label>
        </div>
        <button className={styles.small}>Save Changes</button>
      </div>
    </div>
  )
}
