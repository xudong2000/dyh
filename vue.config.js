module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
      '/io': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        pathRewrite: {
          '^/io': '',
        },
      },
    },
  },
}
