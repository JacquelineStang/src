import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({
  base: '/src/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['pwa-192x192.png', 'pwa-512x512.png'],
      manifest: {
        name: 'SmartBus - Mobilidade Inteligente',
        short_name: 'SmartBus',
        description: 'Sistema de Mobilidade Inteligente de Curitiba',
        theme_color: '#1e3a8a',
        background_color: '#1e3a8a',
        display: 'standalone',
        start_url: '/src/',
        scope: '/src/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
});