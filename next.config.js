
const withImages = require('next-images')
// module.exports = withImages(withCSS())
// const path = require('path')

module.exports = withImages({
 webpack (config, options) {
   config.module.rules.push({
     test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
     use: {
       loader: 'url-loader',
       options: {
         limit: 100000
       }
     }
   })
   return config
 }
})
