import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Correct __dirname on Windows and Unix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, '../back-end/certs/key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, '../back-end/certs/cert.pem')),
    },
    port: 5173, // Keep your original port
  },
})


