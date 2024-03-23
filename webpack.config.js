import buildEverythingConfig from "./webpack-buildEverything.js"
import onlyRebuildHtmlCssAndJs from "./webpack-onlyBuildHtmlCssAndJs.js"
import devServerConfig from "./webpack-devServerConfig.js"

const executeWebpack = (env) => {
  const buildAll = !!env.buildAll
  const mode = env.mode
  const devServer = env.devServer

  if (devServer) {
    return devServerConfig(mode)
  }

  return buildAll ?  buildEverythingConfig(mode) : onlyRebuildHtmlCssAndJs(mode)
}

export default executeWebpack