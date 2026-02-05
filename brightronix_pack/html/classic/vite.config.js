import { defineConfig } from 'vite';
import inject from '@rollup/plugin-inject';
import { resolve } from 'path';
import { readdirSync } from 'fs';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const htmlEntries = Object.fromEntries(
  readdirSync(__dirname)
    .filter((file) => file.endsWith('.html'))
    .map((file) => [file.replace(/\.html$/, ''), resolve(__dirname, file)])
);

export default defineConfig({
  define: {
    global: 'window',
  },
  plugins: [
    inject({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      moment: 'moment',
      'window.moment': 'moment',
    }),

    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/tinymce',
          dest: '.', // Copies to dist/tinymce
        },
        {
          src: 'node_modules/lightgallery/dist/fonts',
          dest: 'fonts', // This copies fonts to /dist/fonts
        },
        {
          src: 'node_modules/lightgallery/dist/img',
          dest: 'img',   // Copies loading.gif
        }
      ],
    }),
  ],
  build: {
    rollupOptions: {
      input: htmlEntries,
    },
  },
});
