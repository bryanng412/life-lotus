import tailwindcss from '@tailwindcss/vite'
import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'
import svgr from 'vite-plugin-svgr'
import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: 'window',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    browser: {
      enabled: true,
      provider: 'playwright',
      instances: [{ browser: 'chromium', headless: true }],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    legacy({
      targets: [
        'last 2 versions and not dead, > 0.3%, Firefox ESR, ios_saf >= 14',
      ],
    }),
    react(),
    tailwindcss(),
    svgr(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'script',

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: 'Life Lotus',
        short_name: 'Life Lotus',
        description: 'Life counter for MTG',
        start_url: '/',
        scope: '/',
        orientation: 'portrait',
        display: 'standalone',
        theme_color: '#000000',
        background_color: '#000000',
        icons: [
          {
            src: '/web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },

      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
      },

      devOptions: {
        enabled: false,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    }),
  ],
})
