import { defineConfig } from 'vite';
import inject from '@rollup/plugin-inject';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

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
      input: {
        main: resolve(__dirname, 'index.html'),
        chats: resolve(__dirname, 'chats.html'),
        chats_group: resolve(__dirname, 'chats-group.html'),
        chats_contact: resolve(__dirname, 'chats-contact.html'),
        chatpopup: resolve(__dirname, 'chatpopup.html'),
        chatbot: resolve(__dirname, 'chatbot.html'),
        calendar: resolve(__dirname, 'calendar.html'),
        email: resolve(__dirname, 'email.html'),
        all_boards: resolve(__dirname, 'projects-board.html'),
        project_kanban: resolve(__dirname, 'kanban-board.html'),
        pipeline_kanban: resolve(__dirname, 'pipeline.html'),
        contact_list: resolve(__dirname, 'contact.html'),
        contact_cards: resolve(__dirname, 'contact-cards.html'),
        edit_contact: resolve(__dirname, 'edit-contact.html'),
        fm_list: resolve(__dirname, 'file-manager-list.html'),
        fm_grid: resolve(__dirname, 'file-manager-grid.html'),
        gallery: resolve(__dirname, 'gallery.html'),
        tasklist: resolve(__dirname, 'tasklist.html'),
        gantt: resolve(__dirname, 'gantt.html'),
        posts: resolve(__dirname, 'posts.html'),
        add_new_post: resolve(__dirname, 'add-new-post.html'),
        post_detail: resolve(__dirname, 'post-detail.html'),
        invoice_list: resolve(__dirname, 'invoice-list.html'),
        invoice_templates: resolve(__dirname, 'invoice-templates.html'),
        create_invoice: resolve(__dirname, 'create-invoice.html'),
        invoice_preview: resolve(__dirname, 'invoice-preview.html'),
        all_apps: resolve(__dirname, 'all-apps.html'),
        app_details: resolve(__dirname, 'integrations-detail.html'),
        integrations: resolve(__dirname, 'integrations.html'),
        profile: resolve(__dirname, 'profile.html'),
        edit_profile: resolve(__dirname, 'edit-profile.html'),
        account: resolve(__dirname, 'account.html'),
        login: resolve(__dirname, 'login.html'),
        login_simple: resolve(__dirname, 'login-simple.html'),
        login_classic: resolve(__dirname, 'login-classic.html'),
        signup: resolve(__dirname, 'signup.html'),
        signup_simple: resolve(__dirname, 'signup-simple.html'),
        signup_classic: resolve(__dirname, 'signup-classic.html'),
        lock_screen: resolve(__dirname, 'lock-screen.html'),
        reset_password: resolve(__dirname, 'reset-password.html'),
        error_404: resolve(__dirname, '404.html'),
        error_503: resolve(__dirname, '503.html'),
      },
    },
  },
});