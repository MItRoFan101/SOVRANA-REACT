import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    // Add split for admin bundle
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    // put all admin code in a separate chunk
                    if (id.includes('/src/admin/') || id.includes('\\src\\admin\\')) {
                        return 'admin';
                    }
                    if (id.includes('node_modules')) {
                        return 'vendor';
                    }
                    // fallback: keep default behavior
                }
            }
        }
    }
})