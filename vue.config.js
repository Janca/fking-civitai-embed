const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    //publicPath: process.env.NODE_ENV === 'production' ? "/fking-civitai-embed/" : "/",
    transpileDependencies: true,
    css: {
        loaderOptions: {
            css: {
                modules: {
                    auto: () => false,
                    localIdentName: process.env.NODE_ENV === 'production' ? 'fk_[hash:8]' : '[name]_[local]_[hash:8]',
                    //getLocalIdent
                }
            }
        }
    },
    outputDir: 'docs'
})
