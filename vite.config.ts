import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import postcsspxtoviewport8plugin from 'postcss-px-to-viewport-8-plugin'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
    return {
        plugins: [
            vue(),
            Components({
                resolvers: [VantResolver()],
            }),
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        css: {
            postcss: {
                plugins: [
                    postcsspxtoviewport8plugin({
                        // unitToConvert: 'px', // 要转化的单位
                        viewportWidth: 375, // UI设计稿的宽度
                        // unitPrecision: 6, // 转换后的精度，即小数点位数
                        propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
                        viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
                        // fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
                        selectorBlackList: ['ign_'], // 指定不转换为视窗单位的类名，
                        minPixelValue: 0.5, // 默认值1，小于或等于1px则不进行转换
                        // mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
                        // replace: true, // 是否转换后直接更换属性值
                        // exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
                        // exclude: [],
                        // landscape: false // 是否处理横屏情况
                    })
                ]
            }
        },
        server: {
            open: true,
            host: '0.0.0.0',
            port: 80,
            // https: false,
            // hot: true,
            proxy: {
                // 开发环境（dev）中解决了跨域问题
                '/api': {
                    target: mode === 'production' ?
                        'http://39.99.112.134'
                        : 'http://39.99.112.134',
                    // secure: true, // 如果是https接口，需要配置这个参数
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/api/, '')
                }
            }
        }
    }
})
