import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  const commonConfig = {
    base: './',
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    }
  }

  if (command === 'serve') {
    return {
      server: {
        // 是否开启https
        https: false,
        // 端口号
        port: 8000,
        // 监听所有地址
        host: '0.0.0.0',
        // 服务启动时是否自动打开浏览器
        open: true,
        // 允许跨域
        cors: true,
        // 自定义代理柜子
        proxy: {}
      },
      ...commonConfig
    }
  } else {
    // command === 'build'
    return {
      build: {
        // 设置最终构建的浏览器兼容目标
        target: 'es2015',
        // 构建后是否生成 source map 文件
        sourcemap: false,
        // chunk 大小警告的限制 kbs
        chunkSizeWarningLimit: 2000,
        // 是否启用gzip压缩大小报告
        reportCompressedSize: false
      },
      ...commonConfig
    }
  }
})
