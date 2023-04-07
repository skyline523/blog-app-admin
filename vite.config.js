import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// 按需引入自动加载组件
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver, VuetifyResolver } from 'unplugin-vue-components/resolvers';
import vuetify from 'vite-plugin-vuetify';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  console.log(command, mode, ssrBuild);
  const commonConfig = {
    base: './',
    plugins: [
      vue(),
      vuetify({ autoImport: true }),
      Components({
        resolvers: [NaiveUiResolver()],
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    css: {
      preprocessOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${resolve('src/style/variables.less ')}"`,
          },
          math: 'strict',
          javascriptEnabled: true,
        },
      },
    },
  };

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
        // 自定义代理
        proxy: {
          '/api': {
            target: 'http://localhost:5000',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
          },
        },
      },
      ...commonConfig,
    };
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
        reportCompressedSize: false,
      },
      ...commonConfig,
    };
  }
});
