import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/

export default ({ mode }) => {
    process.env = loadEnv(mode, process.cwd())
    console.log(`正在启动${process.env.VITE_NODE_ENV}环境`)

    return defineConfig({
        server: {
            open: false,
            port: 9600,
            host: '0.0.0.0',
            strictPort: false,
            proxy: {
                '/api': {
                    target: '',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, '')
                }
            }
        },
        resolve: {
            alias: {
                src: resolve(__dirname, 'src')
            }
        },
        plugins: [vue()]
    })
}
