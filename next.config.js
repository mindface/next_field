
const withImages = require("next-images");
// const path = require("path");

const nextConfig = {
  experimental: {
    serverActions: true,
  },
  // 調査中
  // sassOptions: {
  //   includePaths: [path.join(__dirname, "src/app/styles/style.sass")],
  // },
};

module.exports = nextConfig;

// withImages({
//  webpack (config, options) {
//    config.module.rules.push({
//      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
//      use: {
//        loader: 'url-loader',
//        options: {
//          limit: 100000
//        }
//      }
//    })
//    return config
//  }
// })
