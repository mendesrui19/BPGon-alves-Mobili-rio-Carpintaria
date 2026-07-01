import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import legacy from '@vitejs/plugin-legacy'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tailwindcss(),
    // Só em produção — evita interferir com o dev server.
    ...(mode === 'production'
      ? [
          legacy({
            targets: ['defaults', 'not IE 11', 'Safari >= 11', 'iOS >= 11'],
            additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
            renderLegacyChunks: true,
            polyfills: true,
          }),
        ]
      : []),
  ],
  build: {
    cssTarget: 'chrome61',
  },
}))
