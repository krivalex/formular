const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/assets/mixins.scss"
          @import "@/assets/style.scss"
          `,
      },
    },
  },
})
