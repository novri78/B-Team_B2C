// Import Vite configuration tools and plugins
import { defineConfig } from "vite";
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { BootstrapVueNextResolver } from 'unplugin-vue-components/resolver'

// Define Vite configuration
export default defineConfig({
    plugins: [
        // Use the Vue plugin for handling .vue files
        vue(),
        // Automatically import components as needed
        Components({
            resolvers: [BootstrapVueNextResolver()],
        }),
    ],

})