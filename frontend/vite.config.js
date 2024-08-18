// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from 'tailwindcss'
// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy:{
//       "/api":{
//         target:"http://localhost:5000"
//       }
//     }
//   },
//   css:{
  
//     postcss:{
//       plugins:[
//         tailwindcss()
//       ]
//     }
//   }
// })


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000"
      }
    }
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss()
      ]
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/styles/variables.scss";` // Optional: Automatically import common variables/mixins in every file
      }
    }
  }
});
