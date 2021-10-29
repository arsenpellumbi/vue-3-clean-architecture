module.exports = {
  pages: {
    index: {
      entry: 'app/main.ts'
    }
  },
  productionSourceMap: false,
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    },
    i18n: {
      locale: 'en-us',
      fallbackLocale: 'en-us',
      localeDir: 'core/locales',
      enableInSFC: true
    }
  },
  transpileDependencies: ['quasar'],
  chainWebpack(config) {
    config.resolve.alias.delete("@")
    config.resolve
      .plugin("tsconfig-paths")
      .use(require("tsconfig-paths-webpack-plugin"))
  },
};
