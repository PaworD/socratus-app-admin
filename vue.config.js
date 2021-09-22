module.exports = {
    runtimeCompiler: true,
    css: {
        loaderOptions: {
            sass: {
                additionalData: `@import "@/scss/__index.scss";`
            }
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js'
            }
        }
    }
}