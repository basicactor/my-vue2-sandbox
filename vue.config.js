const { defineConfig } = require("@vue/cli-service")
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  // devServer: {
  //   proxy: {
  //     "^/apis": {
  //       target: "http://localhost:3000",
  //       ws: true,
  //       secure: false,
  //     },
  //   },
  // },
})
